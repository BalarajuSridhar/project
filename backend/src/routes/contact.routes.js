// backend/src/routes/contact.routes.js
import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
      company,
      phone
    } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, subject, and message are required'
      });
    }

    // Save contact message to database
    const contactQuery = `
      INSERT INTO contact_messages (
        name,
        email,
        subject,
        message,
        company,
        phone,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, 'new')
      RETURNING *
    `;

    const result = await query(contactQuery, [
      name,
      email,
      subject,
      message,
      company,
      phone
    ]);

    // In production, you would send an email here
    console.log('Contact form submission received:', {
      name,
      email,
      subject,
      company
    });

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Thank you for your message. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process contact form'
    });
  }
});

export default router;