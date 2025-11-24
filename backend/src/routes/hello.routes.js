// backend/src/routes/hello.routes.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello from CareerLaunch API!' });
});

export default router;