'use strict';

import Submission from '../../domain/entities/Submission.js';
import MongooseSubmission from '../database/models/Submission.Model.js';
import ISubmissionRepository from '../../domain/repositories/ISubmissionRepository.js';

export default class extends ISubmissionRepository {
    async persist(submissionEntity) {
        const { 
            problemId, submittedBy, submittedAt,
            language, code, runtime, memory
        } = submissionEntity;
        const mongooseSubmission = new MongooseSubmission({ 
            problemId, language, code, runtime, memory, submittedBy, submittedAt
        });
        await mongooseSubmission.save();
        return mapToSubmissionEntity(mongooseSubmission);
    }

    async merge(submissionEntity) {
        const modifiedFields = submissionEntity.getModifiedFields();
        if (Object.keys(modifiedFields).length === 0) {
            return; // No modifications to update
        }

        const updateFields = {};
        for (const field in modifiedFields) {
            if (modifiedFields[field]) {
                updateFields[field] = submissionEntity[field];
            }
        }

        await MongooseSubmission.findByIdAndUpdate(submissionEntity.id, updateFields);

        submissionEntity.clearModifiedFields();
        return true;
    }

    async remove(problemId) {
        const doc = await MongooseSubmission.findOneAndDelete({ problemId });
        return !!doc;
    }

    async findById(id) {
        const mongooseSubmission = await MongooseSubmission.findById(id);
        return mapToSubmissionEntity(mongooseSubmission);
    }

    // async findBySubmissionId(submissionId) {
    //     const mongooseSubmission = await MongooseSubmission.findOne({  });
    //     return mapToSubmissionEntity(mongooseSubmission);
    // }

    async findByProblemAndUser(problemId, userId) {
        const mongooseSubmission = await MongooseSubmission.find({ problemId: problemId, submittedBy: userId }).lean();
        return mongooseSubmission.map(submission => mapToSubmissionEntity(submission));
    }
};

function mapToSubmissionEntity(mongooseSubmission) {
    if (!mongooseSubmission) {
        return null;
    }

    const submission = new Submission(
        mongooseSubmission._id,
        mongooseSubmission.problemId,
        mongooseSubmission.language,
        mongooseSubmission.code,
        mongooseSubmission.runtime,
        mongooseSubmission.memory,
        mongooseSubmission.submittedBy,
        mongooseSubmission.submittedAt
    );

    return submission;
}
