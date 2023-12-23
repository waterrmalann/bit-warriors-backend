import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
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
    }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;