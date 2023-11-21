import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '../../interfaces/routes/authRoutes.js';
import profileRoutes from '../../interfaces/routes/profileRoutes.js';
import { isAuthenticated } from '../../interfaces/controllers/AuthMiddleware.js';
dotenv.config();

const createServer = async () => {
    const app = express();
    app.use(cors({
        //! NextJS Frontend Port
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', authRoutes);
    app.use('/', isAuthenticated, profileRoutes);

    return app;
}

export default createServer;