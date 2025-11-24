// backend/src/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import { PORT, NODE_ENV, CORS_ORIGIN } from './config/index.js';
import timezoneMiddleware from './middlewares/timezone.js';
import helloRoutes from './routes/hello.routes.js';
import internshipRoutes from './routes/internships.routes.js';
import contactRoutes from './routes/contact.routes.js';
import { getPool } from './db.js';
import { registerSocketHandlers } from './socket.js';

const app = express();
app.set('trust proxy', true);

// Middlewares
app.use(helmet());
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(timezoneMiddleware);

// quick request logger for debugging
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/hello', helloRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/contact', contactRoutes);

// health
app.get('/healthz', (_req, res) => res.json({ ok: true }));

// Database initialization endpoint
app.post('/api/init-db', async (_req, res) => {
  try {
    const pool = getPool();
    
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS internships (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT[],
        responsibilities TEXT[],
        stipend DECIMAL(10,2),
        duration VARCHAR(100),
        application_deadline DATE,
        is_remote BOOLEAN DEFAULT false,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        internship_id INTEGER REFERENCES internships(id),
        student_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        cover_letter TEXT NOT NULL,
        resume_url VARCHAR(500),
        portfolio_url VARCHAR(500),
        linkedin_url VARCHAR(500),
        status VARCHAR(50) DEFAULT 'pending',
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        company VARCHAR(255),
        phone VARCHAR(50),
        status VARCHAR(50) DEFAULT 'new',
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert sample internships
    const sampleInternships = [
      {
        title: 'Frontend Developer Intern',
        company_name: 'TechCorp',
        location: 'San Francisco, CA',
        type: 'tech',
        description: 'Join our frontend team to build amazing user experiences using modern technologies like React, Next.js, and TypeScript. You will work closely with senior developers and designers to create responsive and accessible web applications.',
        requirements: ['React', 'JavaScript', 'CSS', 'HTML5', 'Git'],
        responsibilities: ['Develop responsive web applications', 'Collaborate with design team', 'Write clean and maintainable code', 'Participate in code reviews'],
        stipend: 3000.00,
        duration: '3 months',
        application_deadline: '2024-12-31',
        is_remote: false,
        is_featured: true
      },
      {
        title: 'UI/UX Design Intern',
        company_name: 'DesignStudio',
        location: 'Remote',
        type: 'design',
        description: 'Work with our design team to create beautiful and intuitive user interfaces. You will participate in user research, create wireframes and prototypes, and help design our next-generation products.',
        requirements: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        responsibilities: ['Create wireframes and prototypes', 'Conduct user research', 'Design user interfaces', 'Collaborate with developers'],
        stipend: 2500.00,
        duration: '4 months',
        application_deadline: '2024-11-30',
        is_remote: true,
        is_featured: true
      },
      {
        title: 'Data Science Intern',
        company_name: 'DataLabs',
        location: 'New York, NY',
        type: 'tech',
        description: 'Join our data science team to work on machine learning projects and data analysis. You will help build predictive models and gain experience with big data technologies.',
        requirements: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Pandas'],
        responsibilities: ['Analyze large datasets', 'Build machine learning models', 'Create data visualizations', 'Write technical reports'],
        stipend: 3500.00,
        duration: '6 months',
        application_deadline: '2024-10-15',
        is_remote: false,
        is_featured: false
      },
      {
        title: 'Marketing Intern',
        company_name: 'GrowthCo',
        location: 'Austin, TX',
        type: 'marketing',
        description: 'Help our marketing team with digital campaigns, content creation, and social media strategy. Perfect for students interested in digital marketing and brand management.',
        requirements: ['Social Media', 'Content Writing', 'Analytics', 'SEO', 'Creativity'],
        responsibilities: ['Create social media content', 'Analyze campaign performance', 'Assist with email marketing', 'Research market trends'],
        stipend: 2000.00,
        duration: '3 months',
        application_deadline: '2024-09-30',
        is_remote: false,
        is_featured: false
      },
      {
        title: 'Business Analyst Intern',
        company_name: 'StrategyPartners',
        location: 'Chicago, IL',
        type: 'business',
        description: 'Work with our business analysis team to gather requirements, analyze processes, and help improve business operations. Great exposure to corporate strategy and operations.',
        requirements: ['Analytical Skills', 'Excel', 'Presentation', 'Problem Solving', 'Communication'],
        responsibilities: ['Gather business requirements', 'Analyze business processes', 'Create documentation', 'Support project management'],
        stipend: 2800.00,
        duration: '4 months',
        application_deadline: '2024-11-15',
        is_remote: false,
        is_featured: true
      },
      {
        title: 'Research Intern',
        company_name: 'InnovationLab',
        location: 'Remote',
        type: 'research',
        description: 'Participate in cutting-edge research projects in your field of study. Work with experienced researchers and contribute to academic publications.',
        requirements: ['Research Methodology', 'Academic Writing', 'Data Analysis', 'Critical Thinking'],
        responsibilities: ['Conduct literature reviews', 'Collect and analyze data', 'Write research papers', 'Present findings'],
        stipend: 2200.00,
        duration: '5 months',
        application_deadline: '2024-10-31',
        is_remote: true,
        is_featured: false
      }
    ];

    // Clear existing data and insert new sample data
    await pool.query('TRUNCATE TABLE internships RESTART IDENTITY CASCADE');
    
    for (const internship of sampleInternships) {
      await pool.query(
        `INSERT INTO internships (
          title, company_name, location, type, description, requirements, 
          responsibilities, stipend, duration, application_deadline, is_remote, is_featured
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          internship.title,
          internship.company_name,
          internship.location,
          internship.type,
          internship.description,
          internship.requirements,
          internship.responsibilities,
          internship.stipend,
          internship.duration,
          internship.application_deadline,
          internship.is_remote,
          internship.is_featured
        ]
      );
    }

    res.json({
      success: true,
      message: 'Database initialized with sample data',
      internships: sampleInternships.length
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initialize database'
    });
  }
});

// Get statistics endpoint
app.get('/api/stats', async (_req, res) => {
  try {
    const pool = getPool();
    
    const [internshipsCount, applicationsCount, companiesCount] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM internships'),
      pool.query('SELECT COUNT(*) FROM applications'),
      pool.query('SELECT COUNT(DISTINCT company_name) FROM internships')
    ]);

    res.json({
      success: true,
      data: {
        internships: parseInt(internshipsCount.rows[0].count),
        applications: parseInt(applicationsCount.rows[0].count),
        companies: parseInt(companiesCount.rows[0].count),
        students: 10500 // Mock data for demonstration
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

// error fallback
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ ok: false, error: err.message || 'Internal Server Error' });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'Endpoint not found' });
});

// create server and wire socket.io
const server = http.createServer(app);

let io;
async function start() {
  try {
    // warm DB
    const pool = getPool();
    await pool.query('SELECT 1');
    console.log('✅ Database connection established');

    // sockets
    io = registerSocketHandlers(server);
    global.io = io;
    console.log('✅ Socket.io handlers registered');

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server listening on http://localhost:${PORT} (NODE_ENV=${NODE_ENV})`);
      console.log(`📊 Health check: http://localhost:${PORT}/healthz`);
      console.log(`🗄️  Database init: http://localhost:${PORT}/api/init-db`);
      console.log(`💼 Internships API: http://localhost:${PORT}/api/internships`);
      console.log(`📞 Contact API: http://localhost:${PORT}/api/contact`);
      console.log(`📈 Stats API: http://localhost:${PORT}/api/stats`);
    });

    // graceful shutdown
    const shutdown = async () => {
      console.log('🛑 Shutting down...');
      try {
        server.close();
        if (global.io) {
          global.io.close();
        }
        if (pool) await pool.end();
        console.log('✅ Shutdown complete');
        process.exit(0);
      } catch (e) {
        console.error('❌ Error during shutdown', e);
        process.exit(1);
      }
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('❌ Failed to start server', err);
    process.exit(1);
  }
}

start();