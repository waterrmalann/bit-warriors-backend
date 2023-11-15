export default async (accessToken, { userRepository, accessTokenManager }) => {
    if (!accessToken) {
        throw Object.assign(new Error("unauthorized, no access token"), { statusCode: 401 });
    }

    const decoded = accessTokenManager.decode(accessToken);
    const user = await userRepository.findByUsername(decoded.username);
    if (!user) {
        throw Object.assign(new Error("user not found."), { statusCode: 404 });
    }

    return user;
}