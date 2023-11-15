import express from 'express';
import { LoginUser, LoginUserMFA, RegisterUser, VerifyEmail } from '../controllers/AuthController.js';
const router = express.Router();

router.get('/test', (req, res) => { res.send("API is working" )});
router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/login-mfa', LoginUserMFA);
router.get('/verify/:verificationCode', VerifyEmail);

export default router;