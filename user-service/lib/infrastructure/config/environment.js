export default (() => {
    console.log("[env] Environment variables have been injected from `.env`");

    const env = {
        DATABASE: {
            URL: process.env.DATABASE_URI || '',
        },
        JWT_SECRET: process.env.JWT_SECRET,
        RESEND_API_KEY: process.env.RESEND_API_KEY
    };

    return env;
})();