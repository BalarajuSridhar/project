// routes/domains.routes.js
import express from 'express';
import { getPool } from '../db.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Save user's domain selection
router.post('/select', authenticateToken, async (req, res) => {
  try {
    const { domains, duration } = req.body;
    const userId = req.user.userId;

    if (!domains || !duration) {
      return res.status(400).json({
        success: false,
        error: 'Domains and duration are required'
      });
    }

    const pool = getPool();

    // Start transaction
    await pool.query('BEGIN');

    // Delete previous selections
    await pool.query(
      'DELETE FROM user_domains WHERE user_id = $1',
      [userId]
    );

    // Insert new selections
    for (const domainId of domains) {
      await pool.query(
        `INSERT INTO user_domains (user_id, domain_id, duration_weeks, selected_at) 
         VALUES ($1, $2, $3, NOW())`,
        [userId, domainId, duration]
      );
    }

    // Update user's onboarding status
    await pool.query(
      'UPDATE users SET onboarding_completed = true WHERE id = $1',
      [userId]
    );

    await pool.query('COMMIT');

    res.json({
      success: true,
      message: 'Domains selected successfully',
      data: { domains, duration }
    });

  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Domain selection error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save domain selection'
    });
  }
});

// Get user's selected domains
router.get('/my-domains', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const pool = getPool();

    const result = await pool.query(
      `SELECT ud.*, d.title as domain_title, d.description, d.color
       FROM user_domains ud
       JOIN domains d ON ud.domain_id = d.id
       WHERE ud.user_id = $1
       ORDER BY ud.selected_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Get domains error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch domains'
    });
  }
});

export default router;