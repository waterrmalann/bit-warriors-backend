import dotenv from 'dotenv';
dotenv.config();

export default (() => {
    console.log("[env] Environment variables have been injected from `.env`");

    const env = {
        DATABASE_URL: process.env.DATABASE_URL,
        TEST_SERVICE_URL: process.env.TEST_SERVICE_URL
    };

    return env;
})();