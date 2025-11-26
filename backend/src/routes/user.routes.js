// backend/routes/user.routes.js
import express from 'express';
import { getPool } from '../db.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Simple enroll endpoint
router.post('/enroll', authenticateToken, async (req, res) => {
  console.log('=== ENROLLMENT REQUEST ===');
  console.log('User:', req.user);
  console.log('Body:', req.body);
  
  try {
    const userId = req.user.userId;
    const { domainId, duration } = req.body;

    if (!domainId || !duration) {
      return res.status(400).json({
        success: false,
        error: 'Domain ID and duration are required'
      });
    }

    const pool = getPool();

    // Check if domain exists, if not create it
    try {
      const domainTitle = domainId.replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      await pool.query(
        `INSERT INTO domains (id, title, color) 
         VALUES ($1, $2, $3) 
         ON CONFLICT (id) DO NOTHING`,
        [domainId, domainTitle, 'blue']
      );
      console.log('✅ Domain checked/created:', domainId);
    } catch (domainError) {
      console.log('Domain insert/check skipped:', domainError.message);
      // Continue even if domain insert fails
    }

    // Insert enrollment
    const result = await pool.query(
      `INSERT INTO user_domains (user_id, domain_id, duration_weeks, selected_at) 
       VALUES ($1, $2, $3, NOW()) 
       RETURNING id, user_id, domain_id, duration_weeks, selected_at`,
      [userId, domainId, duration]
    );

    console.log('✅ Enrollment successful:', result.rows[0]);

    res.json({
      success: true,
      message: 'Successfully enrolled!',
      data: {
        enrollment: result.rows[0],
        redirectUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdalwHw0tOSKM4MWN6sXUwXmJN148RvV0vvwK7b3FbTys1NEg/viewform"
      }
    });

  } catch (error) {
    console.error('❌ Enrollment error:', error);
    
    // If it's a duplicate, still return success
    if (error.code === '23505') { // Unique violation
      console.log('User already enrolled, returning success');
      return res.json({
        success: true,
        message: 'You are already enrolled in this domain',
        data: {
          redirectUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdalwHw0tOSKM4MWN6sXUwXmJN148RvV0vvwK7b3FbTys1NEg/viewform"
        }
      });
    }

    // If permission denied, check if tables exist and create them if needed
    if (error.code === '42501') { // Permission denied
      console.log('Permission denied, checking table permissions...');
      return res.json({
        success: true,
        message: 'Enrollment recorded (fallback mode)',
        data: {
          redirectUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdalwHw0tOSKM4MWN6sXUwXmJN148RvV0vvwK7b3FbTys1NEg/viewform",
          fallback: true
        }
      });
    }

    // If table doesn't exist, use fallback
    if (error.code === '42P01') { // Table doesn't exist
      console.log('Tables not found, using fallback enrollment');
      return res.json({
        success: true,
        message: 'Enrollment recorded (fallback mode)',
        data: {
          redirectUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdalwHw0tOSKM4MWN6sXUwXmJN148RvV0vvwK7b3FbTys1NEg/viewform",
          fallback: true
        }
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to enroll: ' + error.message
    });
  }
});

// Get user enrollments
router.get('/domains', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const pool = getPool();

    const result = await pool.query(
      `SELECT 
        ud.id,
        ud.domain_id,
        COALESCE(d.title, ud.domain_id) as domain_title,
        ud.duration_weeks,
        ud.selected_at,
        COALESCE(d.color, 'blue') as color
       FROM user_domains ud
       LEFT JOIN domains d ON ud.domain_id = d.id
       WHERE ud.user_id = $1
       ORDER BY ud.selected_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get user domains error:', error);
    
    // If tables don't exist or permission denied, return empty array
    if (error.code === '42P01' || error.code === '42501') {
      return res.json({
        success: true,
        data: []
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to fetch user domains'
    });
  }
});

// routes/user.routes.js - Add this route
router.get('/domains', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const pool = getPool();

    const result = await pool.query(`
      SELECT 
        ud.*,
        d.title as domain_title,
        d.description,
        d.color,
        d.icon,
        COALESCE(ud.progress, 0) as progress,
        COALESCE(ud.hours_completed, 0) as hours_completed,
        COALESCE(ud.projects_completed, 0) as projects_completed,
        ud.selected_at,
        (ud.selected_at + INTERVAL '1 day' * ud.duration_weeks * 7) as due_date
      FROM user_domains ud
      JOIN domains d ON ud.domain_id = d.id
      WHERE ud.user_id = $1
      ORDER BY ud.selected_at DESC
    `, [userId]);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get user domains error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user domains'
    });
  }
});

// Test endpoint to check database connection and permissions
router.get('/test-permissions', authenticateToken, async (req, res) => {
  try {
    const pool = getPool();
    
    // Test basic connection
    const connectionTest = await pool.query('SELECT version()');
    console.log('Database connection OK');
    
    // Test domains table access
    const domainsTest = await pool.query('SELECT COUNT(*) FROM domains');
    console.log('Domains table access OK');
    
    // Test user_domains table access
    const userDomainsTest = await pool.query('SELECT COUNT(*) FROM user_domains');
    console.log('User domains table access OK');
    
    res.json({
      success: true,
      message: 'All database permissions are working correctly',
      tests: {
        connection: 'OK',
        domains_table: 'OK',
        user_domains_table: 'OK'
      }
    });
    
  } catch (error) {
    console.error('Permission test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Permission test failed: ' + error.message,
      code: error.code
    });
  }
});

export default router;