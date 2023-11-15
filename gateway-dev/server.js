import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import authenticate from './authenticateMiddleware';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const services = {
    user: process.env.USER_SERVICE,
    admin: process.env.ADMIN_SERVICE,
};

const userServiceProxy = createProxyMiddleware('/api/user', {
    target: services.user,
    changeOrigin: true,
    pathRewrite: {'^/api/user': ''}
});

const adminServiceProxy = createProxyMiddleware("/api/admin", {
    target: services.admin,
    changeOrigin: true,
    pathRewrite: {'^/api/admin': ''}
});

app.use('/api/user', authenticate, userServiceProxy);
app.use('/api/admin', adminServiceProxy);

const port = 3000;
app.listen(port, () => {
    console.log(`[ SERVICE :: API GATEWAY ] API Gateway is listening on http://localhost:${port}`);
});