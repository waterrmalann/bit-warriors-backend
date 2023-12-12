import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '../../interfaces/routes/authRoutes.js';
import profileRoutes from '../../interfaces/routes/profileRoutes.js';
import { isAuthenticated } from '../../interfaces/controllers/AuthMiddleware.js';

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
    app.use('/', authRoutes);
    app.use('/', isAuthenticated, profileRoutes);

    return app;
}

export default createServer;