'use strict';

import User from '../../domain/entities/User.js';

export default async (username, { userRepository }) => {

    const user = await userRepository.findByUsername(username);
    if (!user) {
        // todo: Decouple statusCode (HTTP Method) from Business Logic
        throw Object.assign(new Error('user not found'), { statusCode: 404 });
    }

    return {
        username: user.username,
        clan: user.clan,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        // ranking, lastSeen
    }
};