// middlewares/auth.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ success: false, error: 'Access token required' });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }
}

export function authenticateAdmin(req, res, next) {
  authenticateToken(req, res, () => {
    if (req.user?.user_type !== 'admin') { // Changed from 'role' to 'user_type'
      return res.status(403).json({ success: false, error: 'Admin access denied' });
    }
    next();
  });
}