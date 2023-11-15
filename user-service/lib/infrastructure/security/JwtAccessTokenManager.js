import IAccessTokenManager from '../../application/security/IAccessTokenManager';

import jwt from 'jsonwebtoken';

// todo: to .env!
const JWT_SECRET_KEY = "shhhh";

export default class extends IAccessTokenManager {
    generate(payload, expiry) {
        return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: expiry });
    }

    decode(accessToken) {
        return jwt.verify(accessToken, JWT_SECRET_KEY);
    }
}