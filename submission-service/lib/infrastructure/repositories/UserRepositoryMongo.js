'use strict';

import User from '../../domain/entities/User.js';
import MongooseUser from '../database/models/User.Model.js';
import IUserRepository from '../../domain/repositories/IUserRepository.js';

export default class extends IUserRepository {
    async persist(userEntity) {
        const { username } = userEntity;
        const mongooseUser = new MongooseUser({ username });
        await mongooseUser.save();
        return mapToUserEntity(mongooseUser);
    }

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
