import express from 'express';
import { LoginUser, LoginUserMFA, LogoutUser, RegisterUser, VerifyEmail } from '../controllers/AuthController.js';
import { isAuthenticated } from '../controllers/AuthMiddleware.js';
const router = express.Router();

router.get('/test', (req, res) => { 
    console.log(req.headers);
    res.send("API is working")
});
router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/login-mfa', LoginUserMFA);
router.get('/verify/:verificationCode', VerifyEmail);
router.get('/logout', LogoutUser);

router.get('/auth', isAuthenticated, (req, res) => { res.json(req.user) });

export default router;