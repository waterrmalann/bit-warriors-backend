export default async (userId, newStats, { userRepository }) => {
    const user = await userRepository.findByUsername(userId);
    newStats.totalScore && user.setScore(newStats.totalScore);
    newStats.totalSubmissions && user.setSubmissions(newStats.totalSubmissions);
    return userRepository.merge(user);
}