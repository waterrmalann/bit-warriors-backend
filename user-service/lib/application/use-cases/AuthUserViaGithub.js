'use strict';

export default async (code, { userRepository, tokenManager, OAuthManager }) => {

    const user = await OAuthManager.getUser(code);
    console.log(user);

    const userFromDB = await userRepository.findByEmail(user.email);
    if (userFromDB) {
        // Case 1: User Already Exists : Log In

        // Case 1.1: Github Not Connected : Link
        // todo: Link Github to their existing account (properly)
        if (userFromDB.githubUsername !== user.username) {
            userFromDB.setGithubUsername(user.username);
            await userRepository.merge(userFromDB);
        }

        const accessToken = tokenManager.generate({ id: userFromDB.id, username: userFromDB.username, email: userFromDB.email }, '7d');
        return accessToken;
    } else {
        // Case 2: New User : Create Account & Log In

        // Case 2.1: Username unavailable : Append _gh
        const usernameExists = userRepository.findByUsername(user.username)
        if (usernameExists) {
            user.username + '_gh';
        }
        
        const newUser = userRepository.persist(user);

        const accessToken = tokenManager.generate({ id: newUser.id, username: newUser.username, email: newUser.email }, '7d');
        return accessToken;
    }

    // note (?): someone who has access to github can log in without creds
    
    // problem note: their github username should be locked in place / removed
    //      solution: Remove the github username as a social link
};