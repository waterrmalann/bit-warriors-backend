import express from 'express';
import { LoginUser, LoginUserMFA, RegisterUser } from '../controllers/AuthController.js';
const router = express.Router();

router.get('/test', (req, res) => { res.send("API is working" )});
router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/login-mfa', LoginUserMFA);

export default router;