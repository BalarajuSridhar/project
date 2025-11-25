import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Authentication middleware
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
    const jwt = await import('jsonwebtoken');
    const { JWT_SECRET } = await import('../config/index.js');
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const userResult = await query(
      'SELECT id, first_name, last_name, email, user_type FROM users WHERE id = $1',
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

// Get dashboard statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's course count
    const coursesResult = await query(
      `SELECT COUNT(*) as course_count 
       FROM student_courses 
       WHERE user_id = $1 AND status = 'active'`,
      [userId]
    );

    // Get total learning hours (mock data for now)
    const hoursResult = await query(
      `SELECT COALESCE(SUM(duration_hours), 0) as total_hours 
       FROM course_progress 
       WHERE user_id = $1`,
      [userId]
    );

    // Get certificates count
    const certificatesResult = await query(
      `SELECT COUNT(*) as certificate_count 
       FROM certificates 
       WHERE user_id = $1`,
      [userId]
    );

    // Get overall progress (mock data for now)
    const progressResult = await query(
      `SELECT COALESCE(AVG(progress_percentage), 0) as avg_progress 
       FROM course_progress 
       WHERE user_id = $1`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        activeCourses: parseInt(coursesResult.rows[0].course_count) || 2,
        hoursLearned: parseInt(hoursResult.rows[0].total_hours) || 24,
        certificates: parseInt(certificatesResult.rows[0].certificate_count) || 1,
        progress: Math.round(parseFloat(progressResult.rows[0].avg_progress)) || 65
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard statistics'
    });
  }
});

// Get user's courses
router.get('/courses', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // For now, return mock course data
    // In a real app, you'd query the student_courses table
    const mockCourses = [
      {
        id: 1,
        title: 'Web Development Bootcamp',
        domain: 'Web Development',
        duration: '8 weeks',
        progress: 65,
        nextLesson: 'React Hooks & State Management',
        dueDate: '2024-01-15',
        instructor: 'John Doe',
        imageUrl: '/images/web-dev.jpg'
      },
      {
        id: 2,
        title: 'Data Science Fundamentals',
        domain: 'Data Science',
        duration: '6 weeks',
        progress: 30,
        nextLesson: 'Data Visualization with Python',
        dueDate: '2024-01-20',
        instructor: 'Jane Smith',
        imageUrl: '/images/data-science.jpg'
      }
    ];

    res.json({
      success: true,
      data: {
        courses: mockCourses
      }
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses'
    });
  }
});

// Get recent activity
router.get('/activity', authenticateToken, async (req, res) => {
  try {
    // Mock activity data
    const mockActivity = [
      {
        id: 1,
        action: 'Completed',
        item: 'JavaScript Basics Quiz',
        course: 'Web Development',
        time: '2 hours ago',
        type: 'quiz'
      },
      {
        id: 2,
        action: 'Submitted',
        item: 'Project Proposal',
        course: 'Data Science',
        time: '1 day ago',
        type: 'assignment'
      },
      {
        id: 3,
        action: 'Started',
        item: 'React Components Module',
        course: 'Web Development',
        time: '2 days ago',
        type: 'lesson'
      }
    ];

    res.json({
      success: true,
      data: {
        activity: mockActivity
      }
    });

  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch activity'
    });
  }
});

export default router;