import express from 'express';
import { GetHello, GetBye, GetProfile, ChangePassword } from '../controllers/ProfileController.js';
import { isAuthenticated } from '../controllers/AuthMiddleware.js';
const router = express.Router();

router.get('/bye', GetBye);
router.get('/hello', isAuthenticated, GetHello);
router.get('/users/:username', isAuthenticated, GetProfile);

router.put('/users/:username/password', isAuthenticated, ChangePassword);

export default router;