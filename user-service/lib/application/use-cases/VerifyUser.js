export default async (verificationCode, { userRepository, accessTokenManager }) => {
    const decoded = accessTokenManager.decode(verificationCode);
    const user = await userRepository.findByUsername(decoded.username);
    if (!user) {
        throw Object.assign(new Error("user not found."), { statusCode: 404 });
    }

    user.setVerified(true);
    return userRepository.merge(user);
}