'use strict';

export default async (username, newData, { userRepository }) => {
    const user = await userRepository.findByUsername(username);
    if (!user) {
        // todo: Decouple statusCode (HTTP Method) from Business Logic
        throw Object.assign(new Error('User does not exist.'), { statusCode: 404 });
    }

    //* note:
    // In the case of editing `username` or `email`,
    // Additional validations need to be put in place.
    // 1. Check if it already exists
    // 2. Check last time username/email was changed (4 day period)
    // 3. (mail) Send a magic link to verify
    // 4. Log the user out? BAD UX

    user.setBio(newData.bio);
    user.setClan(newData.clan);
    user.setGithubUsername(newData.githubUsername);
    user.setLinkedInUsername(newData.linkedInUsername);
    user.setXUsername(newData.xUsername);
    user.setPersonalWebsite(newData.personalWebsite);

    return userRepository.merge(user);
};