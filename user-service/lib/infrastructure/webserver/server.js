import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../../interfaces/routes/authRoutes.js';
dotenv.config();

const createServer = async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', authRoutes);

    return app;
}

export default createServer;