import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: true,
    }, 
    submittedBy: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    runtime: {
        type: String,
        required: true
    },
    memory: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        default: ''
    }
});

const SubmissionModel = mongoose.model('Submission', SubmissionSchema);

export default SubmissionModel;