export default async (verificationCode, { userRepository, accessTokenManager }) => {
    const decoded = accessTokenManager.decode(verificationCode);

    const user = await userRepository.findByUsername(decoded.username);

    if (!user) {
        throw Object.assign(new Error("user not found."), { statusCode: 404 });
    }

    if (user.emailVerified) {
        throw Object.assign(new Error("user is already email verified"), { statusCode: 409 })
    }

    user.setVerified(true);
    return userRepository.merge(user);
}