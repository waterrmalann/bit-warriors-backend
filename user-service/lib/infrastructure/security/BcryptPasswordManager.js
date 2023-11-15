import bcrypt from 'bcrypt';
import IPasswordManager from '../../application/security/IPasswordManager.js';

export default class extends IPasswordManager {
    async hash(password) {
        return bcrypt.hash(password)
    }

    async compare(entered, original) {
        return bcrypt.compare(entered, original);
    }
}