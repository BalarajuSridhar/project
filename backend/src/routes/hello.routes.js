import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ ok: true, message: 'Hello from backend (connections ready)', time: new Date().toISOString() });
});

export default router;
