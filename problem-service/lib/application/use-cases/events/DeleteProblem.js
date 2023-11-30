export default async (problemId, { problemRepository }) => {
    return problemRepository.remove(problemId);
}