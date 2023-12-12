'use strict';

import IProblemRepository from '../../domain/repositories/IProblemRepository.js';
import Problem from '../../domain/entities/Problem.js';
import MongooseProblem from '../database/models/Problem.Model.js';

export default class extends IProblemRepository {
    async persist(problemEntity) {
        const { 
            problemId, 
            title, testCases, 
            preloadedCode, functionName
        } = problemEntity;
        const mongooseProblem = new MongooseProblem({ 
            problemId, title, preloadedCode, functionName, testCases
        });
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
        const doc = await MongooseProblem.findOneAndDelete({ problemId });
        return !!doc;
    }

    async findById(id) {
        const mongooseProblem = await MongooseProblem.findById(id);
        return mapToProblemEntity(mongooseProblem);
    }

    async findByProblemId(problemId) {
        const mongooseProblem = await MongooseProblem.findOne({ problemId });
        return mapToProblemEntity(mongooseProblem);
    }
};

function mapToProblemEntity(mongooseProblem) {
    if (!mongooseProblem) {
        return null;
    }

    const problem = new Problem(
        mongooseProblem._id,
        mongooseProblem.problemId,
        mongooseProblem.title
    );
    problem.testCases = mongooseProblem.testCases;
    problem.preloadedCode = mongooseProblem.preloadedCode;
    problem.functionName = mongooseProblem.functionName;

    return problem;
}
