import express from 'express';
import { me } from '../controllers/userController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/me', protectedRoute, me);

export default router;
