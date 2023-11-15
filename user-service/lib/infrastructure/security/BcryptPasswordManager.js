import bcrypt from 'bcrypt';
import IPasswordManager from '../../application/security/IPasswordManager.js';

export default class extends IPasswordManager {
    async hash(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt)
    }

    async compare(entered, original) {
        return bcrypt.compare(entered, original);
    }
}