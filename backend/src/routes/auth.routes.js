import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const router = express.Router();

// Add this middleware for token verification
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    
    // Get user data from database
    const userResult = await query(
      `SELECT 
        u.id, u.first_name, u.last_name, u.email, u.user_type,
        s.college, s.domain_interest
      FROM users u
      LEFT JOIN student_profiles s ON u.id = s.user_id
      WHERE u.id = $1`,
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    req.user = userResult.rows[0];
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

// Student Registration
router.post('/register/student', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      college,
      graduationYear,
      domainInterest
    } = req.body;

    console.log('Registration attempt for:', email);

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'All required fields must be provided'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const userResult = await query(
      `INSERT INTO users (
        first_name, last_name, email, password, phone, user_type
      ) VALUES ($1, $2, $3, $4, $5, 'student')
      RETURNING id, first_name, last_name, email, user_type, created_at`,
      [firstName, lastName, email, hashedPassword, phone]
    );

    // Create student profile
    await query(
      `INSERT INTO student_profiles (
        user_id, college, graduation_year, domain_interest
      ) VALUES ($1, $2, $3, $4)`,
      [userResult.rows[0].id, college, graduationYear, domainInterest]
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: userResult.rows[0].id,
        email: userResult.rows[0].email,
        userType: userResult.rows[0].user_type
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    console.log('User registered successfully:', email);

    res.status(201).json({
      success: true,
      message: 'Student registration successful',
      data: {
        user: {
          id: userResult.rows[0].id,
          firstName: userResult.rows[0].first_name,
          lastName: userResult.rows[0].last_name,
          email: userResult.rows[0].email,
          userType: userResult.rows[0].user_type
        },
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed. Please try again.'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt for:', email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find user
    const userResult = await query(
      `SELECT 
        u.id, u.first_name, u.last_name, u.email, u.password, u.user_type,
        s.college, s.domain_interest
      FROM users u
      LEFT JOIN student_profiles s ON u.id = s.user_id
      WHERE u.email = $1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      console.log('User not found:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    const user = userResult.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password for:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        userType: user.user_type
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    console.log('Login successful for:', email);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          userType: user.user_type,
          college: user.college,
          domainInterest: user.domain_interest
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed. Please try again.'
    });
  }
});

// Get current user profile - FIXED ENDPOINT
router.get('/me', authenticateToken, (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: {
          id: req.user.id,
          firstName: req.user.first_name,
          lastName: req.user.last_name,
          email: req.user.email,
          userType: req.user.user_type,
          college: req.user.college,
          domainInterest: req.user.domain_interest
        }
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user profile'
    });
  }
});

export default router;