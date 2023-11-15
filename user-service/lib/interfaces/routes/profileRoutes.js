import express from 'express';
import { GetHello, GetBye } from '../controllers/ProfileController.js';
import { isAuthenticated } from '../controllers/AuthMiddleware.js';
const router = express.Router();

router.get('/bye', GetBye);
router.get('/hello', isAuthenticated, GetHello);

export default router;