'use strict';

export default async (email, password, { userRepository, tokenManager, passwordManager, mfaManager }) => {
    const user = userRepository.findByEmail(email);
    const doPasswordsMatch = await passwordManager.compare(password, user.password);

    if (!user || !doPasswordsMatch) {
        // todo: Decouple statusCode (HTTP Method) from Business Logic
        throw Object.assign(new Error('Bad credentials'), { statusCode: 401 });
    }

    if (user.mfa) {
        const otp = await mfaManager.generateOTP();
        user.setOTP(otp, 5);
        userRepository.merge(user);
        return { success: false, token: '', status: "MFA_REQUIRED" };
    } else {
        return { success: true, token: tokenManager.generate({ uid: user.id }), status: "LOGGED_IN" };
    }
};