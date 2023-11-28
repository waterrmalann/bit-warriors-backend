'use strict';

import IUserRepository from '../../domain/repositories/IUserRepository.js';

import User from '../../domain/entities/User.js';
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
        
        await MongooseUser.findByIdAndUpdate(userEntity.id, updateFields);

        userEntity.clearModifiedFields();
        return true;
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
        const mongooseUser = await MongooseUser.findOne({ email: userEmail });
        return mapToUserEntity(mongooseUser);
    }

    async findByUsername(username) {
        const mongooseUser = await MongooseUser.findOne({ username: username });
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

    const user = new User(
        mongooseUser._id, 
        mongooseUser.username, 
        mongooseUser.email, 
        mongooseUser.password,        
    );
    
    user.emailVerified = mongooseUser.emailVerified;
    user.bio = mongooseUser.bio;
    user.clan = mongooseUser.clan;
    user.followers = mongooseUser.followers;
    user.following = mongooseUser.following;
    user.createdAt = mongooseUser.createdAt;
    user.totalScore = mongooseUser.totalScore;
    user.totalSubmissions = mongooseUser.totalSubmissions;
    user.totalActiveDays = mongooseUser.totalActiveDays;
    user.maxActiveDays = mongooseUser.maxActiveDays;
    user.mfa = mongooseUser.mfa;
    user.otp = mongooseUser.otp;

    // Social Links
    user.githubUsername = mongooseUser.githubUsername;
    user.linkedInUsername = mongooseUser.linkedInUsername;
    user.xUsername = mongooseUser.xUsername;
    user.personalWebsite = mongooseUser.personalWebsite;

    return user;
}
