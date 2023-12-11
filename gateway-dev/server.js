import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authenticate from './authenticateMiddleware.js';
dotenv.config();

const app = express();

const corsOptions = {
    //! NextJS Frontend Port
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use('*', cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authenticate);

const services = {
    user: process.env.USER_SERVICE,
    problem: process.env.PROBLEM_SERVICE,
    submission: process.env.SUBMISSION_SERVICE,
    // not implemented yet: discuss: process.env.DISCUSS_SERVICE
};

const routes = [
    {
        context: "/api/user",
        target: services.user,
        changeOrigin: true,
        pathRewrite: { "^/api/user": "" },
    },
    {
        context: "/api/problem",
        target: services.problem,
        changeOrigin: true,
        pathRewrite: { "^/api/problem": "" }
    },
    {
        context: "/api/submission",
        target: services.submission,
        changeOrigin: true,
        pathRewrite: { "^/api/submission": "" }
    },
];


routes.forEach((route) => {
    app.use(
        route.context,
        createProxyMiddleware({
            target: route.target,
            pathRewrite: route.pathRewrite,
            changeOrigin: true,
            secure: false,
            onProxyReq: (proxyReq, req) => {
                // Modify headers or perform other actions before sending the request
            },
        })
    );
});

const port = 3001;
app.listen(port, () => {
    console.log(" ▄▄▄▄    ██▓▄▄▄█████▓    █     █░ ▄▄▄       ██▀███   ██▀███   ██▓ ▒█████   ██▀███    ██████ ")
    console.log(" ▓█████▄ ▓██▒▓  ██▒ ▓▒   ▓█░ █ ░█░▒████▄    ▓██ ▒ ██▒▓██ ▒ ██▒▓██▒▒██▒  ██▒▓██ ▒ ██▒▒██    ▒ ")
    console.log(" ▒██▒ ▄██▒██▒▒ ▓██░ ▒░   ▒█░ █ ░█ ▒██  ▀█▄  ▓██ ░▄█ ▒▓██ ░▄█ ▒▒██▒▒██░  ██▒▓██ ░▄█ ▒░ ▓██▄   ")
    console.log(" ▒██░█▀  ░██░░ ▓██▓ ░    ░█░ █ ░█ ░██▄▄▄▄██ ▒██▀▀█▄  ▒██▀▀█▄  ░██░▒██   ██░▒██▀▀█▄    ▒   ██▒")
    console.log(" ░▓█  ▀█▓░██░  ▒██▒ ░    ░░██▒██▓  ▓█   ▓██▒░██▓ ▒██▒░██▓ ▒██▒░██░░ ████▓▒░░██▓ ▒██▒▒██████▒▒")
    console.log(" ░▒▓███▀▒░▓    ▒ ░░      ░ ▓░▒ ▒   ▒▒   ▓▒█░░ ▒▓ ░▒▓░░ ▒▓ ░▒▓░░▓  ░ ▒░▒░▒░ ░ ▒▓ ░▒▓░▒ ▒▓▒ ▒ ░")
    console.log(" ▒░▒   ░  ▒ ░    ░         ▒ ░ ░    ▒   ▒▒ ░  ░▒ ░ ▒░  ░▒ ░ ▒░ ▒ ░  ░ ▒ ▒░   ░▒ ░ ▒░░ ░▒  ░ ░")
    console.log("  ░    ░  ▒ ░  ░           ░   ░    ░   ▒     ░░   ░   ░░   ░  ▒ ░░ ░ ░ ▒    ░░   ░ ░  ░  ░  ")
    console.log("  ░       ░                  ░          ░  ░   ░        ░      ░      ░ ░     ░           ░  ")
    console.log("       ░                                                                                     ")
    console.log(`[ SERVICE :: API GATEWAY ] API Gateway is listening on http://localhost:${port}`);
});