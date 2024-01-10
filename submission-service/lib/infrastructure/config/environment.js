import dotenv from 'dotenv';
dotenv.config();

export default (() => {
    console.log("[env] Environment variables have been injected from `.env`");

    const env = {
        DATABASE_URL: process.env.DATABASE_URL,
        TEST_SERVICE_URL: process.env.TEST_SERVICE_URL,
        PROBLEM_SERVICE_URL: process.env.PROBLEM_SERVICE_URL,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        PORT: process.env.PORT,
        KAFKA_BROKERS: process.env.KAFKA_BROKERS.split(','),
    };

    return env;
})();