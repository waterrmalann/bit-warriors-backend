import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import submissionRoutes from '../../interfaces/routes/submissionRoutes.js';
import aiRoutes from '../../interfaces/routes/aiRoutes.js';
import queryRoutes from '../../interfaces/routes/queryRoutes.js';
import { setupDatabaseStatus, setupStatus } from '@bit-warriors/status';
import mongoose from 'mongoose';
dotenv.config();

const createServer = async () => {
    const app = express();

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    setupStatus(app);
    setupDatabaseStatus(app, mongoose);
    app.use('/', submissionRoutes);
    app.use('/', queryRoutes);
    app.use('/', aiRoutes);

    return app;
}

export default createServer;