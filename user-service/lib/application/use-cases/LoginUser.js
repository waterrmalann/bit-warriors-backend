'use strict';

export default async (email, password, { userRepository, tokenManager, passwordManager, mfaManager, mailerService }) => {
    const user = userRepository.findByEmail(email);
    const doPasswordsMatch = await passwordManager.compare(password, user.password);

    if (!user || !doPasswordsMatch) {
        // todo: Decouple statusCode (HTTP Method) from Business Logic
        throw Object.assign(new Error('Bad credentials'), { statusCode: 401 });
    }

    if (!user.emailVerified) {
        throw Object.assign(new Error('Unverified email'), { statusCode: 403 });
    }

    if (user.mfa) {
        const otp = await mfaManager.generateOTP();
        user.setOTP(otp, 5);
        userRepository.merge(user);
        const mail = await mailerService.sendMail({
            to: user.email,
            subject: "<BitWarriors/> :: Multi Factor Authentication",
            html: `<p>Dear user,</p>
            <p>You have just requested to log in to your multi-factor enabled account.</a>.</p>
            <p>Your code is:</p>
            <p>${otp}</p>
            <p>If you did not request to log in, your password is compromised.</p>
            <p>~ <b>BitWarriors</b></p>`
        });

        if (!mail) {
            throw Object.assign(new Error("could not send otp email"), { statusCode: 503 });
        }

        return { success: false, token: '', status: "MFA_REQUIRED" };
    } else {
        return { success: true, token: tokenManager.generate({ uid: user.id }), status: "LOGGED_IN" };
    }
};