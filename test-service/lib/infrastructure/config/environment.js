import dotenv from 'dotenv';
dotenv.config();

export default (() => {
    console.log("[env] Environment variables have been injected from `.env`");

    const env = {
        PORT: process.env.PORT,
        CES_URL: process.env.CES_URL
    };

    return env;
})();