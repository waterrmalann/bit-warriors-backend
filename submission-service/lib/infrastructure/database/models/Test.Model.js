import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    preloadedCode: {
        type: String
    },
    functionName: {
        type: String,
    },
    testCases: [{
        _id: false,
        label: String,
        params: [String],
        expect: String
    }],
    }, {
        timestamps: true
    }
);

const testModel = mongoose.model('Test', testSchema);

export default testModel;