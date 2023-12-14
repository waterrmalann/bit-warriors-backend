'use strict';

import Test from '../../domain/entities/Test.js';
import MongooseTest from '../database/models/Test.Model.js';
import ITestsRepository from '../../domain/repositories/ITestsRepository.js';

export default class extends ITestsRepository {
    async persist(testEntity) {
        const { 
            problemId, language, testCases, 
            preloadedCode, functionName
        } = testEntity;
        const mongooseTest = new MongooseTest({ 
            problemId, language, preloadedCode, functionName, testCases
        });
        await mongooseTest.save();
        return mapToTestEntity(mongooseTest);
    }

    async merge(testEntity) {
        const modifiedFields = testEntity.getModifiedFields();
        if (Object.keys(modifiedFields).length === 0) {
            return; // No modifications to update
        }

        const updateFields = {};
        for (const field in modifiedFields) {
            if (modifiedFields[field]) {
                updateFields[field] = testEntity[field];
            }
        }

        await MongooseTest.findByIdAndUpdate(testEntity.id, updateFields);

        testEntity.clearModifiedFields();
        return true;
    }

    async remove(problemId) {
        const doc = await MongooseTest.findOneAndDelete({ problemId });
        return !!doc;
    }

    async findById(id) {
        const mongooseTest = await MongooseTest.findById(id);
        return mapToTestEntity(mongooseTest);
    }

    async findByProblemId(problemId) {
        const mongooseTest = await MongooseTest.findOne({ problemId });
        return mapToTestEntity(mongooseTest);
    }
};

function mapToTestEntity(mongooseTest) {
    if (!mongooseTest) {
        return null;
    }

    const testCase = new Test(
        mongooseTest._id,
        mongooseTest.problemId
    );
    testCase.language = mongooseTest.language;
    testCase.testCases = mongooseTest.testCases;
    testCase.preloadedCode = mongooseTest.preloadedCode;
    testCase.functionName = mongooseTest.functionName;

    return testCase;
}
