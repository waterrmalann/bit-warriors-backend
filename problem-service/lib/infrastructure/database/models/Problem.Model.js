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
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    constraints: {
        type: [String],
        required: true,
        default: []
    },
    examples: {
        type: [String],
        required: true,
        default: []
    },
    tags: {
        type: [String],
        required: true,
        default: []
    },
    hint: {
        type: String
    },
    upvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    downvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;