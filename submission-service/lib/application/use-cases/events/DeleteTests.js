export default async (problemId, { testsRepository }) => {
    return testsRepository.remove(problemId);
}