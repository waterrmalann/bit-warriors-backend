'use strict';

import User from '../../domain/entities/User.js';
import MongooseUser from '../database/models/User.Model.js';
import IUserRepository from '../../domain/repositories/IUserRepository.js';
import { produce } from '../../interfaces/consumers/ProblemConsumer.js';

export default class extends IUserRepository {
    /**
     * 
     * @param {User} userEntity 
     * @returns {User}
     */
    async persist(userEntity) {
        const { username } = userEntity;
        const mongooseUser = new MongooseUser({ username });
        await mongooseUser.save();
        return mapToUserEntity(mongooseUser);
    }

    /**
     * 
     * @param {User} userEntity 
     * @returns {Boolean}
     */
    async merge(userEntity) {
        const modifiedFields = userEntity.getModifiedFields();
        if (Object.keys(modifiedFields).length === 0) {
            return; // No modifications to update
        }

        const updateFields = {};
        for (const field in modifiedFields) {
            if (modifiedFields[field]) {
                updateFields[field] = userEntity[field];
            }
        }

        await MongooseUser.findByIdAndUpdate(userEntity.id, updateFields);
        modifiedFields.totalSubmissions && await produce('USER_STATS', 'stats_update', { 
            userId: userEntity.username, 
            totalSubmissions: userEntity.totalSubmissions, 
            totalScore: userEntity.totalScore 
        });
        userEntity.clearModifiedFields();
        return true;
    }

    async remove(userEntity) {
        const doc = await MongooseUser.findOneAndDelete({ username: userEntity.username });
        return !!doc;
    }

    async findById(id) {
        const mongooseTest = await MongooseUser.findById(id);
        return mapToUserEntity(mongooseTest);
    }

    async findByUsername(username) {
        const mongooseUser = await MongooseUser.findOne({ username: username });
        return mapToUserEntity(mongooseUser);
    }

    async calculateRankings() {

        // todo: cache or optimize the leaderboards phase
        const leaderboardsData = await MongooseUser.aggregate([
            { $sort: { totalScore: -1 } },
            { $setWindowFields: {
                partitionBy: null,
                sortBy: { totalScore: -1 },
                output: { rank: { $denseRank: {} } }
            }},
            { $project: { _id: 0, username: 1, totalScore: 1, totalSubmissions: 1, rank: 1 } }
        ]);

        return leaderboardsData;
  
    }
};

function mapToUserEntity(mongooseUser) {
    if (!mongooseUser) {
        return null;
    }

    const user = new User(
        mongooseUser._id,
        mongooseUser.username
    );
    user.totalSubmissions = mongooseUser.totalSubmissions;
    user.totalScore = mongooseUser.totalScore;

    return user;
}
