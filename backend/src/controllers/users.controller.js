// backend/src/controllers/users.controller.js
import { query } from '../db.js';

// Create a user
export async function createUser(req, res, next) {
  try {
    const { email, name, password_hash } = req.body;
    if (!email) return res.status(400).json({ ok: false, error: 'email required' });

    const text = `
      INSERT INTO users (email, name, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, email, name, created_at;
    `;
    const params = [email, name || null, password_hash || null];
    const result = await query(text, params);
    return res.status(201).json({ ok: true, user: result.rows[0] });
  } catch (err) {
    // unique violation code for Postgres is 23505
    if (err?.code === '23505') {
      return res.status(409).json({ ok: false, error: 'email already exists' });
    }
    next(err);
  }
}

// List all users
export async function listUsers(req, res, next) {
  try {
    const result = await query('SELECT id, email, name, created_at FROM users ORDER BY id DESC', []);
    res.json({ ok: true, users: result.rows });
  } catch (err) {
    next(err);
  }
}

// Get a user by id
export async function getUserById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ ok: false, error: 'invalid id' });
    const result = await query('SELECT id, email, name, created_at FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ ok: false, error: 'user not found' });
    res.json({ ok: true, user: result.rows[0] });
  } catch (err) {
    next(err);
  }
}
