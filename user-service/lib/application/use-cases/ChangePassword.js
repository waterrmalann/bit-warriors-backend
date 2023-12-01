'use strict';

export default async (username, oldPassword, newPassword, { userRepository, passwordManager }) => {
    const user = await userRepository.findByUsername(username);
    if (!user) {
        // todo: Decouple statusCode (HTTP Method) from Business Logic
        throw Object.assign(new Error('User does not exist.'), { statusCode: 404 });
    }
    
    const doPasswordsMatch = await passwordManager.compare(oldPassword, user.password);
    if (!doPasswordsMatch) {
        throw Object.assign(new Error('Invalid password'), { statusCode: 401 });
    }

    const arePasswordsSame = oldPassword === newPassword;
    if (arePasswordsSame) {
        throw Object.assign(new Error("New password cannot be same as old one."), { statusCode: 400 })
    }

    if (newPassword.length < 8) {
        throw Object.assign(new Error("Password must be atleast 8 characters long."), {statusCode: 403});
    }

    const hashedPassword = await passwordManager.hash(newPassword);
    user.setPassword(hashedPassword);
    return userRepository.merge(user);
};