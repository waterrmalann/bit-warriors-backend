import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import testRoutes from '../../interfaces/routes/testRoutes.js';
import { setupStatus } from '@bit-warriors/status';
dotenv.config();

const createServer = async () => {
    const app = express();

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    setupStatus(app);
    app.use('/', testRoutes);

    return app;
}

export default createServer;