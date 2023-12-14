import Test from "../../../domain/entities/Test.js";

export default async (testData, { testsRepository }) => {
    const test = new Test(
        null,
        testData.problemId,
    );
    test.language = testData.language;
    test.preloadedCode = testData.preloadedCode;
    test.functionName = testData.functionName;
    test.testCases = testData.testCases;

    return testsRepository.persist(test);
}