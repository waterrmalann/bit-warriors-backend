import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    bio: String,
    clan: String,
    followers: {
        type: Number,
        default: 0,
    },
    following: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    totalScore: {
        type: Number,
        default: 0,
    },
    totalSubmissions: {
        type: Number,
        default: 0,
    },
    totalActiveDays: {
        type: Number,
        default: 0,
    },
    currentActiveDays: {
        type: Number,
        default: 0,
    },
    maxActiveDays: {
        type: Number,
        default: 0,
    },
    otp: {
        requested: {
            type: Boolean,
            default: false,
        },
        value: String,
        expiry: {
            type: Number,
            default: 0
        },
    },
    mfa: {
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;