'use strict';

import IProblemRepository from '../../domain/repositories/IProblemRepository.js';
import Problem from '../../domain/entities/Problem.js';
import MongooseProblem from '../database/models/Problem.Model.js';

export default class extends IProblemRepository {
    async persist(problemEntity) {
        const { username, email, password } = problemEntity;
        const mongooseProblem = new MongooseProblem({ username, email, password });
        await mongooseProblem.save();
        return mapToProblemEntity(mongooseProblem);
    }

    async merge(problemEntity) {
        const modifiedFields = problemEntity.getModifiedFields();
        if (Object.keys(modifiedFields).length === 0) {
            return; // No modifications to update
        }

        const updateFields = {};
        for (const field in modifiedFields) {
            if (modifiedFields[field]) {
                updateFields[field] = problemEntity[field];
            }
        }

        await MongooseProblem.findByIdAndUpdate(problemEntity.id, updateFields);

        problemEntity.clearModifiedFields();
        return true;
    }

    async remove(problemId) {
        //! fixme: this shouldn't work
        const doc = await MongooseProblem.findOneAndDelete(problemId);
        return !!doc;
    }

    async findById(problemId) {
        const mongooseProblem = await MongooseProblem.findById(problemId);
        return mapToProblemEntity(mongooseProblem);
    }

    async findByProblemId(problemId) {
        const mongooseProblem = await MongooseProblem.findOne({ problemId });
        return mapToProblemEntity(mongooseProblem);
    }
    
    async findBySlug(problemSlug) {
        const mongooseProblem = await MongooseProblem.findOne({ slug: problemSlug });
        return mapToProblemEntity(mongooseProblem);
    }

    async find() {
        const mongooseProblems = await MongooseProblem.find();
        return mongooseProblems.map((mongooseProblem) => {
            return mapToProblemEntity(mongooseProblem);
        });
    }
};

function mapToProblemEntity(mongooseProblem) {
    if (!mongooseProblem) {
        return null;
    }

    const problem = new Problem(
        mongooseProblem._id,
        mongooseProblem.problemId,
        mongooseProblem.title,
        mongooseProblem.slug,
        mongooseProblem.description,
        mongooseProblem.difficulty,
        mongooseProblem.constraints,
        mongooseProblem.examples,
        mongooseProblem.tags,
        mongooseProblem.hint,
        mongooseProblem.upvotes,
        mongooseProblem.downvotes,
        mongooseProblem.createdAt,
        mongooseProblem.modifiedAt
    );

    return problem;
}