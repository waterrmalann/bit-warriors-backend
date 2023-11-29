import express from 'express';
import { GetProfile, ChangePassword, EditProfile } from '../controllers/ProfileController.js';
import { isAuthenticated } from '../controllers/AuthMiddleware.js';
const router = express.Router();

router.get('/users/:username', isAuthenticated, GetProfile);
router.put('/users/:username', isAuthenticated, EditProfile);
router.put('/users/:username/password', isAuthenticated, ChangePassword);

export default router;