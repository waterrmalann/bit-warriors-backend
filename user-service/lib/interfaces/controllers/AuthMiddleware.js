import AuthenticateUserInteractor from '../../application/use-cases/AuthenticateUser.js';
import UserRepository from '../../infrastructure/repositories/UserRepositoryMongo.js';
import AccessTokenManager from '../../infrastructure/security/JwtAccessTokenManager.js';

const userRepository = new UserRepository();
const accessTokenManager = new AccessTokenManager();

export async function isAuthenticated(req, res, next) {
    // check x-authenticated === 'true' in req.headers
    
    let token = req.cookies.jwt;
    try {
        const user = await AuthenticateUserInteractor(token, { 
            userRepository: userRepository, 
            accessTokenManager: accessTokenManager 
        });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
}