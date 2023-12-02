// Use Cases (Business Logic)
import LoginUserInteractor from '../../application/use-cases/LoginUser.js';
import RegisterUserInteractor from '../../application/use-cases/RegisterUser.js';
import VerifyUserInteractor from '../../application/use-cases/VerifyUser.js';
import AuthUserViaGithubInteractor from '../../application/use-cases/AuthUserViaGithub.js';
// Repositories (Database Abstraction)
import UserRepository from '../../infrastructure/repositories/UserRepositoryMongo.js';
// Security (JWT / Hashing Abstraction)
import AccessTokenManager from '../../infrastructure/security/JwtAccessTokenManager.js';
import PasswordManager from '../../infrastructure/security/BcryptPasswordManager.js';
import MFAManager from '../../infrastructure/security/otpMFAManager.js';
import GithubOAuthManager from '../../infrastructure/security/githubOAuthManager.js';
// Services (Features Abstraction)
import MailerService from '../../infrastructure/services/ResendMailerService.js';

const userRepository = new UserRepository();
const accessTokenManager = new AccessTokenManager();
const passwordManager = new PasswordManager();
const mfaManager = new MFAManager();
const mailerService = new MailerService();
const githubOAuthManager = new GithubOAuthManager();

export async function LoginUser(req, res) {
    const { username, password } = req.body;
    try {
        const response = await LoginUserInteractor(username, password, { 
            userRepository: userRepository,
            tokenManager: accessTokenManager,
            passwordManager: passwordManager,
            mfaManager: mfaManager,
            mailerService: mailerService
        });

        if (response.success) {
            res.cookie('jwt', response.token, {
                httpOnly: true,
                // secure: process.env.NODE_ENV !== 'development',
                // sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).send({ mfa_required: false, message: "You are in.", token: response.token });
        } else {
            res.status(200).send({ mfa_required: true, message: "OTP Required" });
        }
    } catch (err) {
        console.log(err);
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}

export async function LoginUserMFA(req, res) {
    const { otp } = req.body;
    try {
        throw new Error("MFA not implemented");
    } catch (err) {
        res.status(500).send({ message: "Internal Server Errror" });
    }
}

export async function RegisterUser(req, res) {
    const { email, username, password } = req.body;
    try {
        const user = await RegisterUserInteractor(username, email, password, {
            userRepository: userRepository,
            accessTokenManager: accessTokenManager,
            mailerService: mailerService,
            passwordManager: passwordManager,
        });

        res.status(201).send({ message: "registered successfully, verify email " });
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}

export async function AuthUserViaGithub(req, res) {
    const { code } = req.body;
    try {
        // If they register via Github, they would be automatically logged in.
        // todo: It should be AuthUserViaOAuth
        const accessToken = await AuthUserViaGithubInteractor(code, { 
            userRepository: userRepository,
            tokenManager: accessTokenManager,
            OAuthManager: githubOAuthManager
            // todo: mailerService
        });

        res.cookie('jwt', accessToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== 'development',
            // sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.sendStatus(201);
    } catch (err) {
        res.status(err.statusCode || 500).send({ message: err.message });
    }
}

export async function LogoutUser(_req, res) {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.json({ success: true });
}

export async function VerifyEmail(req, res) {
    const { verificationCode } = req.params;
    try {
        const result = await VerifyUserInteractor(verificationCode, { 
            userRepository: userRepository, 
            accessTokenManager: accessTokenManager
        });
        if (result) {
            res.status(200).send({ success: true, message: "email has been verified." });
        } else {
            res.status(500).send({ success: false, message: "invalid token" });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
}