import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const services = { };

/* SET UP PROXIES TO SERVICES */

const port = 3000;
app.listen(port, () => {
    console.log(`[ SERVICE :: API GATEWAY ] API Gateway is listening on http://localhost:${port}`);
});