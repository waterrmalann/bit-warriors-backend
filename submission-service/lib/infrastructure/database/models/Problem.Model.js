import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    preloadedCode: String,
    functionName: String,
    testCases: [
        {
            params: [String],
            expect: String
        }
    ]
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;