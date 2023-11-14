'use strict';

export default (email, password, { userRepository, tokenManager }) => {
    const user = userRepository.getByEmail(email);
    if (!user || user.password !== password) {
        throw new Error('Bad credentials');
    }
    return tokenManager.generate({ uid: user.id });
};