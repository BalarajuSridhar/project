// backend/src/routes/users.routes.js
import express from 'express';
import { createUser, listUsers, getUserById } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/', createUser);        // POST /api/users
router.get('/', listUsers);          // GET  /api/users
router.get('/:id', getUserById);     // GET  /api/users/:id

export default router;
