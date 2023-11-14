import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const createServer = async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return app;
}

export default createServer;