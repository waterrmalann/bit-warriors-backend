'use strict';

export default async (code, { userRepository, tokenManager, OAuthManager }) => {

    const user = await OAuthManager.getUser(code);
    console.log(user);

    const userFromDB = await userRepository.findByEmail(user.email);
    if (userFromDB) {
        // Case 1: User Already Exists : Log In

        // Case 1.1: Google Not Connected : Link
        // todo: Link Google to their existing account (properly)
        // if (userFromDB.google !== user.username) {
        //     userFromDB.setGoogleUsername(user.username);
        //     await userRepository.merge(userFromDB);
        // }

        const accessToken = tokenManager.generate({ id: userFromDB.id, username: userFromDB.username, email: userFromDB.email }, '7d');
        return accessToken;
    } else {
        // Case 2: New User : Create Account & Log In

        // Case 2.1: Username unavailable : Append _go
        const usernameExists = await userRepository.findByUsername(user.username)
        if (usernameExists) {
            user.username + '_go';
        }
        
        const newUser = await userRepository.persist(user);

        const accessToken = tokenManager.generate({ id: newUser.id, username: newUser.username, email: newUser.email }, '7d');
        return accessToken;
    }

    // note (?): someone who has access to google can log in without creds
};