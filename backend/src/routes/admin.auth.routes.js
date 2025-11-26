// backend/routes/admin.auth.routes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getPool } from '../db.js';
import { JWT_SECRET } from '../config/index.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Admin login attempt for:', email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const pool = getPool();

    // Find user with admin type
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND user_type = $2',
      [email, 'admin']
    );

    if (result.rows.length === 0) {
      console.log('❌ No admin user found with email:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid admin credentials'
      });
    }

    const user = result.rows[0];
    console.log('✅ Found admin user:', user.email);
    console.log('📝 Stored password hash:', user.password);
    console.log('📏 Hash length:', user.password?.length);

    // Debug: Generate a test hash to see what it should be
    const testHash = await bcrypt.hash('admin123', 12);
    console.log('🔍 Test hash for "admin123":', testHash);
    
    // Test the provided password against stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔑 Password validation result:', isPasswordValid);

    // Also test if 'admin123' works with the stored hash
    const testAdmin123 = await bcrypt.compare('admin123', user.password);
    console.log('🧪 Test "admin123" against stored hash:', testAdmin123);

    if (!isPasswordValid) {
      console.log('❌ Password validation failed');
      return res.status(401).json({
        success: false,
        error: 'Invalid admin credentials - Password incorrect'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        userType: user.user_type
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('🎉 Admin login successful for:', user.email);

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.user_type
        }
      }
    });

  } catch (error) {
    console.error('💥 Admin login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Verify admin token
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      
      const pool = getPool();
      const userResult = await pool.query(
        'SELECT id, email, first_name, last_name, user_type FROM users WHERE id = $1 AND user_type = $2',
        [decoded.userId, 'admin']
      );

      if (userResult.rows.length === 0) {
        return res.status(401).json({
          success: false,
          error: 'Invalid admin token'
        });
      }

      res.json({
        success: true,
        data: {
          user: userResult.rows[0]
        }
      });

    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }

  } catch (error) {
    console.error('Admin verify error:', error);
    res.status(500).json({
      success: false,
      error: 'Token verification failed'
    });
  }
});

export default router;