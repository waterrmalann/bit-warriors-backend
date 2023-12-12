import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import retrievalRoutes from '../../interfaces/routes/retrievalRoutes.js';
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
    app.use('/', retrievalRoutes);

    return app;
}

export default createServer;