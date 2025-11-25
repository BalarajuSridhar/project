import pkg from 'pg';
const { Pool } = pkg;
import { DATABASE_URL } from './config/index.js';

let pool = null;

export function getPool() {
  if (pool) return pool;
  if (!DATABASE_URL) throw new Error('DATABASE_URL not set');
  
  pool = new Pool({
    connectionString: DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  });

  pool.on('error', (err) => {
    console.error('Unexpected database error', err);
  });

  return pool;
}

export async function query(text, params) {
  const p = getPool();
  return p.query(text, params);
}