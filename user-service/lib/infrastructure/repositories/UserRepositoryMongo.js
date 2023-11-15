'use strict';

import IUserRepository from '../../domain/repositories/IUserRepository';

import User from '../../domain/entities/User';
import MongooseUser from '../database/models/User.Model.js';

export default class extends IUserRepository {
    async persist(userEntity) {
        const { username, email, password } = userEntity;
        const mongooseUser = new MongooseUser({ username, email, password });
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

        await this.UserModel.findByIdAndUpdate(userEntity.id, updateFields);

        userEntity.clearModifiedFields();
    }

    async remove(userId) {
        const doc = await MongooseUser.findOneAndDelete(userId);
        return !!doc;
    }

    async findById(userId) {
        const mongooseUser = await MongooseUser.findById(userId);
        return mapToUserEntity(mongooseUser);
    }

    async findByEmail(userEmail) {
        const mongooseUser = await MongooseUser.find({ email: userEmail });
        return mapToUserEntity(mongooseUser);
    }

    async findByUsername(username) {
        const mongooseUser = await MongooseUser.find({ username: username });
        return mapToUserEntity(mongooseUser);
    }

    async find() {
        const mongooseUsers = await MongooseUser.find();
        return mongooseUsers.map((mongooseUser) => {
            return mapToUserEntity(mongooseUser);
        });
    }
};

function mapToUserEntity(mongooseUser) {
    if (!mongooseUser) {
        return null;
    }

    return new User(mongooseUser.id, mongooseUser.username, mongooseUser.email, mongooseUser.password);
}
