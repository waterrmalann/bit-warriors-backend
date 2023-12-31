import dotenv from 'dotenv';
dotenv.config();

export default (() => {
    console.log("[env] Environment variables have been injected from `.env`");

    const env = {
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        PORT: process.env.PORT,
        KAFKA_BROKERS: process.env.KAFKA_BROKERS.split(',')
    };

    return env;
})();