'use strict';

export default async (email, password, { userRepository, tokenManager, comparePassword }) => {
    const user = userRepository.getByEmail(email);
    const doPasswordsMatch = await comparePassword(password, user.password);

    if (!user || !doPasswordsMatch) {
        // todo: Decouple statusCode (HTTP Method) from Business Logic
        throw Object.assign(new Error('Bad credentials'), { statusCode: 401 });
    }

    return tokenManager.generate({ uid: user.id });
};