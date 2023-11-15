// Use Cases (Business Logic)
import LoginUserInteractor from '../../application/use-cases/LoginUser.js';
import RegisterUserInteractor from '../../application/use-cases/RegisterUser.js';
import VerifyUserInteractor from '../../application/use-cases/VerifyUser.js';
// Repositories (Database Abstraction)
import UserRepository from '../../infrastructure/repositories/UserRepositoryMongo.js';
// Security (JWT / Hashing Abstraction)
import AccessTokenManager from '../../infrastructure/security/JwtAccessTokenManager.js';
import PasswordManager from '../../infrastructure/security/BcryptPasswordManager.js';
import MFAManager from '../../infrastructure/security/otpMFAManager.js';
// Services (Features Abstraction)
import MailerService from '../../infrastructure/services/ResendMailerService.js';

const userRepository = new UserRepository();
const accessTokenManager = new AccessTokenManager();
const passwordManager = new PasswordManager();
const mfaManager = new MFAManager();
const mailerService = new MailerService();

export async function LoginUser(req, res) {
    const { username, password } = req.body;
    try {
        const response = await LoginUserInteractor(username, password, { 
            userRepository: userRepository,
            tokenManager: accessTokenManager,
            passwordManager: passwordManager,
            mfaManager: mfaManager
        });

        if (response.success) {
            res.status(200).send({ mfa_required: false, message: "You are in." });
        } else {
            res.status(200).send({ mfa_required: true, message: "OTP Required" });
        }

        // todo: Set cookie.
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
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
        })
        res.status(201).send({ message: "registered successfully, verify email " });
    } catch (err) {
        res.status(500).send({ message: "unauthorized" });
    }
}

export async function LogoutUser(_req, res) {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
}

export async function VerifyEmail(req, res) {
    const { verificationCode } = req.params;
    try {
        const result = await VerifyUserInteractor(verificationCode, { 
            userRepository: userRepository, 
            accessTokenManager: accessTokenManager
        });
        if (result) {
            res.status(200).send({ message: "email has been verified." });
        } else {
            res.status(500).send({ message: "invalid token" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}