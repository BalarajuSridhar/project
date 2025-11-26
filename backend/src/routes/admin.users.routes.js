// routes/admin.users.routes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import { getPool } from '../db.js';
import { authenticateAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Create new user (admin only)
router.post('/users', authenticateAdmin, async (req, res) => {
  try {
    const { email, password, firstName, lastName, domains } = req.body;

    const pool = getPool();
    
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const userResult = await pool.query(
      `INSERT INTO users (email, password, first_name, last_name, user_type, is_verified) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, first_name, last_name, user_type`,
      [email, hashedPassword, firstName, lastName, 'user', true]
    );

    const user = userResult.rows[0];

    // Assign domains if provided
    if (domains && domains.length > 0) {
      for (const domainId of domains) {
        await pool.query(
          `INSERT INTO user_domains (user_id, domain_id, duration_weeks, selected_at, assigned_by) 
           VALUES ($1, $2, $3, NOW(), $4)`,
          [user.id, domainId, 8, req.admin.userId] // Default 8 weeks
        );
      }
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type
        },
        message: 'User created successfully'
      }
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

// Get all users with their domains
router.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const pool = getPool();
    
    const usersResult = await pool.query(`
      SELECT 
        u.id, u.email, u.first_name, u.last_name, u.user_type, u.is_verified, u.created_at,
        json_agg(
          json_build_object(
            'id', ud.id,
            'domain_id', ud.domain_id,
            'domain_title', d.title,
            'duration_weeks', ud.duration_weeks,
            'selected_at', ud.selected_at,
            'progress', ud.progress,
            'color', d.color
          )
        ) as domains
      FROM users u
      LEFT JOIN user_domains ud ON u.id = ud.user_id
      LEFT JOIN domains d ON ud.domain_id = d.id
      WHERE u.user_type = 'user'
      GROUP BY u.id, u.email, u.first_name, u.last_name, u.user_type, u.is_verified, u.created_at
      ORDER BY u.created_at DESC
    `);

    res.json({
      success: true,
      data: {
        users: usersResult.rows
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

// Assign domains to user
router.post('/users/:userId/domains', authenticateAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { domains, duration_weeks } = req.body;

    const pool = getPool();

    // Delete existing domains
    await pool.query(
      'DELETE FROM user_domains WHERE user_id = $1',
      [userId]
    );

    // Assign new domains
    for (const domainId of domains) {
      await pool.query(
        `INSERT INTO user_domains (user_id, domain_id, duration_weeks, selected_at, assigned_by) 
         VALUES ($1, $2, $3, NOW(), $4)`,
        [userId, domainId, duration_weeks || 8, req.admin.userId]
      );
    }

    res.json({
      success: true,
      message: 'Domains assigned successfully'
    });

  } catch (error) {
    console.error('Assign domains error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to assign domains'
    });
  }
});

export default router;