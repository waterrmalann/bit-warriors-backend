'use strict';

export default async (username, newData, { userRepository }) => {
    const user = await userRepository.findByUsername(username);
    if (!user) {
        // todo: Decouple statusCode (HTTP Method) from Business Logic
        throw Object.assign(new Error('User does not exist.'), { statusCode: 404 });
    }

    // if (newData.email !== user.email) {

    // }

    newData.bio && user.setBio(newData.bio);
    newData.clan && user.setClan(newData.clan);
    newData.githubUsername && user.setGithubUsername(newData.githubUsername);
    newData.linkedInUsername && user.setLinkedInusername(newData.linkedInUsername);
    newData.xUsername && user.setXUsername(newData.xUsername);
    newData.personalWebsite && user.setPersonalWebsite(newData.personalWebsite);

    return userRepository.merge(user);
};