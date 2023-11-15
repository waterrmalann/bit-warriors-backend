'use strict';

export default async (email, password, { userRepository, tokenManager, passwordManager }) => {
    const user = userRepository.findByEmail(email);
    const doPasswordsMatch = await passwordManager.compare(password, user.password);

    if (!user || !doPasswordsMatch) {
        // todo: Decouple statusCode (HTTP Method) from Business Logic
        throw Object.assign(new Error('Bad credentials'), { statusCode: 401 });
    }

    return tokenManager.generate({ uid: user.id });
};