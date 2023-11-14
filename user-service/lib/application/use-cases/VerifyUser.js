export default async (verificationCode, { userRepository, accessTokenManager }) => {
    const decoded = accessTokenManager.decode(verificationCode);
    const user = await userRepository.findByUsername(decoded.username);
    if (!user) {
        throw new Error("user not found.");
    }

    user.setVerified(true);
    return userRepository.setVerified(user.userId, true);
}