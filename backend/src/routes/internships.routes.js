// backend/src/routes/internships.routes.js
import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Get all internships with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      location,
      search,
      company
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = [];
    let queryParams = [];

    if (type) {
      whereConditions.push(`i.type = $${queryParams.length + 1}`);
      queryParams.push(type);
    }

    if (location) {
      whereConditions.push(`i.location ILIKE $${queryParams.length + 1}`);
      queryParams.push(`%${location}%`);
    }

    if (search) {
      whereConditions.push(`(i.title ILIKE $${queryParams.length + 1} OR i.description ILIKE $${queryParams.length + 2})`);
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (company) {
      whereConditions.push(`i.company_name ILIKE $${queryParams.length + 1}`);
      queryParams.push(`%${company}%`);
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    // Get total count
    const countQuery = `
      SELECT COUNT(*) 
      FROM internships i
      ${whereClause}
    `;
    const countResult = await query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].count);

    // Get internships
    const internshipsQuery = `
      SELECT 
        i.id,
        i.title,
        i.company_name as "companyName",
        i.location,
        i.type,
        i.description,
        i.requirements,
        i.responsibilities,
        i.stipend,
        i.duration,
        i.application_deadline as "applicationDeadline",
        i.is_remote as "isRemote",
        i.is_featured as "isFeatured",
        i.created_at as "createdAt",
        i.updated_at as "updatedAt"
      FROM internships i
      ${whereClause}
      ORDER BY i.is_featured DESC, i.created_at DESC
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `;

    const internshipsResult = await query(
      internshipsQuery, 
      [...queryParams, limit, offset]
    );

    res.json({
      success: true,
      data: {
        internships: internshipsResult.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch internships'
    });
  }
});

// Get single internship by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const internshipQuery = `
      SELECT 
        i.id,
        i.title,
        i.company_name as "companyName",
        i.location,
        i.type,
        i.description,
        i.requirements,
        i.responsibilities,
        i.stipend,
        i.duration,
        i.application_deadline as "applicationDeadline",
        i.is_remote as "isRemote",
        i.is_featured as "isFeatured",
        i.created_at as "createdAt",
        i.updated_at as "updatedAt"
      FROM internships i
      WHERE i.id = $1
    `;

    const result = await query(internshipQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Internship not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching internship:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch internship'
    });
  }
});

// Create internship application
router.post('/:id/apply', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      studentName,
      email,
      phone,
      coverLetter,
      resumeUrl,
      portfolioUrl,
      linkedinUrl
    } = req.body;

    // Validate required fields
    if (!studentName || !email || !coverLetter) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and cover letter are required'
      });
    }

    // Check if internship exists
    const internshipCheck = await query(
      'SELECT id FROM internships WHERE id = $1',
      [id]
    );

    if (internshipCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Internship not found'
      });
    }

    // Create application
    const applicationQuery = `
      INSERT INTO applications (
        internship_id,
        student_name,
        email,
        phone,
        cover_letter,
        resume_url,
        portfolio_url,
        linkedin_url,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
      RETURNING *
    `;

    const applicationResult = await query(applicationQuery, [
      id,
      studentName,
      email,
      phone,
      coverLetter,
      resumeUrl,
      portfolioUrl,
      linkedinUrl
    ]);

    // Notify via socket.io if available
    if (global.io) {
      global.io.emit('new-application', {
        internshipId: id,
        application: applicationResult.rows[0]
      });
    }

    res.status(201).json({
      success: true,
      data: applicationResult.rows[0],
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit application'
    });
  }
});

export default router;