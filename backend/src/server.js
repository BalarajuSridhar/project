import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';


import { PORT, NODE_ENV, CORS_ORIGIN } from './config/index.js';
import { getPool } from './db.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import helloRoutes from './routes/hello.routes.js';
import userRoutes from './routes/user.routes.js';
import domainRoutes from './routes/domains.routes.js';
import adminRoutes from './routes/admin.routes.js';
import adminAuthRoutes from './routes/admin.auth.routes.js';
import adminUserRoutes from './routes/admin.users.routes.js';

const app = express();
app.set('trust proxy', true);

// Middlewares
app.use(helmet());
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(cors({ 
  origin: CORS_ORIGIN, 
  credentials: true 
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/hello', helloRoutes);
app.use('/api/user', userRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin', adminUserRoutes);



// Health check
app.get('/healthz', async (_req, res) => {
  try {
    const pool = getPool();
    await pool.query('SELECT 1');
    res.json({ 
      ok: true, 
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({ 
      ok: false, 
      error: 'Database connection failed' 
    });
  }
});

// Test database endpoint
app.get('/api/test-db', async (_req, res) => {
  try {
    const pool = getPool();
    const result = await pool.query('SELECT version()');
    res.json({ 
      success: true, 
      message: 'Database connected successfully',
      version: result.rows[0].version 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Database connection failed',
      details: error.message 
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: `Route ${req.originalUrl} not found` 
  });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({ 
    success: false, 
    error: err.message || 'Internal Server Error' 
  });
});

// Start server
async function start() {
  try {
    // Test database connection
    const pool = getPool();
    await pool.query('SELECT 1');
    console.log('✅ Database connection established');

    const server = http.createServer(app);

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server listening on http://localhost:${PORT} (NODE_ENV=${NODE_ENV})`);
      console.log(`📊 Health check: http://localhost:${PORT}/healthz`);
      console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
      console.log(`📈 Dashboard API: http://localhost:${PORT}/api/dashboard`);
      console.log(`🗄️ Database test: http://localhost:${PORT}/api/test-db`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log('🛑 Shutting down...');
      try {
        server.close();
        await pool.end();
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