import express from 'express';
import { AuthUserViaGithub, LoginUser, LoginUserMFA, LogoutUser, RegisterUser, VerifyEmail } from '../controllers/AuthController.js';
import { isAuthenticated } from '../controllers/AuthMiddleware.js';
const router = express.Router();

router.get('/test', (req, res) => {
    console.log(req.headers);
    res.send("API is working")
});
router.post('/login', LoginUser);
router.post('/register', RegisterUser);
router.post('/oauth-github', AuthUserViaGithub);
router.post('/login-mfa', LoginUserMFA);
router.get('/verify/:verificationCode', VerifyEmail);
router.get('/logout', LogoutUser);

router.get('/auth', isAuthenticated, (req, res) => {
    let userObject = {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        emailVerified: req.user.emailVerified,
        followers: req.user.followers,
        following: req.user.following,
        createdAt: req.user.createdAt,
        mfa: req.user.mfa,
        totalScore: req.user.totalScore,
        totalSubmissions: req.user.totalSubmissions,
        totalActiveDays: req.user.totalActiveDays,
        currentActiveDays: req.user.currentActiveDays,
        maxActiveDays: req.user.maxActiveDays,
        clan: req.user.clan,
        bio: req.user.bio,
        githubUsername: req.user.githubUsername,
        linkedInUsername: req.user.linkedInUsername,
        xUsername: req.user.xUsername,
        personalWebsite: req.user.personalWebsite
    };
    res.json(userObject);
});

export default router;