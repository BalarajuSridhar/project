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

// health
app.get('/healthz', (_req, res) => res.json({ ok: true }));

// error fallback
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ ok: false, error: err.message || 'Internal Server Error' });
});

// create server and wire socket.io
const server = http.createServer(app);

let io;
async function start() {
  try {
    // warm DB
    const pool = getPool();
    await pool.query('SELECT 1');

    // sockets
    io = registerSocketHandlers(server);
    global.io = io;

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on http://localhost:${PORT} (NODE_ENV=${NODE_ENV})`);
    });

    // graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down...');
      try {
        server.close();
        if (global.io) {
          global.io.close();
        }
        if (pool) await pool.end();
        console.log('Shutdown complete');
        process.exit(0);
      } catch (e) {
        console.error('Error during shutdown', e);
        process.exit(1);
      }
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
