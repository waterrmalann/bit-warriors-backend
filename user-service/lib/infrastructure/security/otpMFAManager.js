import IMFAManager from '../../application/security/IMFAManager.js';

export default class extends IMFAManager {
    generateOTP() {
        //! todo: this implementation is not cryptographically secure.
        // todo: length should be a business logic (?)
        const digits = '0123456789';
        let otp = [];
        for (let i = 0; i < 5; i++) {
            otp.push(digits.charAt(Math.floor(Math.random() * digits.length)));
        }
        return otp.join('');
    }

    verifyOTP(secret, otp) {
        return secret === otp.value && Math.floor(Date.now() / 1000) < otp.expiry;
    }
}