// backend/routes/admin.routes.js
import express from 'express';
import { getPool } from '../db.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    const pool = getPool();
    const result = await pool.query(
      'SELECT user_type FROM users WHERE id = $1', // Changed from 'role' to 'user_type'
      [req.user.userId]
    );
    
    if (result.rows.length === 0 || result.rows[0]?.user_type !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({
      success: false,
      error: 'Error checking admin privileges'
    });
  }
};
// Get admin dashboard stats
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const pool = getPool();
    
    const [
      totalUsers,
      totalEnrollments,
      recentUsers,
      domainStats
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM users'),
      pool.query('SELECT COUNT(*) as count FROM user_domains'),
      pool.query(`
        SELECT id, email, first_name, last_name, created_at 
        FROM users 
        ORDER BY created_at DESC 
        LIMIT 5
      `),
      pool.query(`
        SELECT 
          COALESCE(d.title, ud.domain_id) as domain_name,
          COUNT(ud.id) as enrollment_count
        FROM user_domains ud
        LEFT JOIN domains d ON ud.domain_id = d.id
        GROUP BY d.title, ud.domain_id
        ORDER BY enrollment_count DESC
        LIMIT 10
      `)
    ]);

    res.json({
      success: true,
      data: {
        totalUsers: parseInt(totalUsers.rows[0].count),
        totalEnrollments: parseInt(totalEnrollments.rows[0].count),
        recentUsers: recentUsers.rows,
        domainStats: domainStats.rows
      }
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch admin stats'
    });
  }
});

// Get all users with pagination
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;
    
    const pool = getPool();
    
    let query = `
      SELECT 
        id, email, first_name, last_name, user_type, 
        is_verified, created_at, updated_at
      FROM users 
      WHERE 1=1
    `;
    let countQuery = `SELECT COUNT(*) FROM users WHERE 1=1`;
    const params = [];
    const countParams = [];

    if (search) {
      query += ` AND (
        email ILIKE $${params.length + 1} OR 
        first_name ILIKE $${params.length + 1} OR 
        last_name ILIKE $${params.length + 1}
      )`;
      countQuery += ` AND (
        email ILIKE $${countParams.length + 1} OR 
        first_name ILIKE $${countParams.length + 1} OR 
        last_name ILIKE $${countParams.length + 1}
      )`;
      params.push(`%${search}%`);
      countParams.push(`%${search}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), parseInt(offset));

    const [usersResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, countParams)
    ]);

    res.json({
      success: true,
      data: {
        users: usersResult.rows,
        total: parseInt(countResult.rows[0].count),
        page: parseInt(page),
        totalPages: Math.ceil(parseInt(countResult.rows[0].count) / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

// Get user details with enrollments
router.get('/users/:userId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const pool = getPool();

    const [userResult, enrollmentsResult] = await Promise.all([
      pool.query('SELECT * FROM users WHERE id = $1', [userId]),
      pool.query(`
        SELECT 
          ud.*,
          d.title as domain_title,
          d.color as domain_color
        FROM user_domains ud
        LEFT JOIN domains d ON ud.domain_id = d.id
        WHERE ud.user_id = $1
        ORDER BY ud.selected_at DESC
      `, [userId])
    ]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: userResult.rows[0],
        enrollments: enrollmentsResult.rows
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user details'
    });
  }
});

// Update user role
router.patch('/users/:userId/role', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role. Must be "user" or "admin"'
      });
    }

    const pool = getPool();
    const result = await pool.query(
      'UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [role, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
      message: `User role updated to ${role}`
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user role'
    });
  }
});

// Get all enrollments
router.get('/enrollments', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const pool = getPool();

    const [enrollmentsResult, countResult] = await Promise.all([
      pool.query(`
        SELECT 
          ud.*,
          u.email,
          u.first_name,
          u.last_name,
          d.title as domain_title,
          d.color as domain_color
        FROM user_domains ud
        JOIN users u ON ud.user_id = u.id
        LEFT JOIN domains d ON ud.domain_id = d.id
        ORDER BY ud.selected_at DESC
        LIMIT $1 OFFSET $2
      `, [limit, offset]),
      pool.query('SELECT COUNT(*) as count FROM user_domains')
    ]);

    res.json({
      success: true,
      data: {
        enrollments: enrollmentsResult.rows,
        total: parseInt(countResult.rows[0].count),
        page: parseInt(page),
        totalPages: Math.ceil(parseInt(countResult.rows[0].count) / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch enrollments'
    });
  }
});

export default router;