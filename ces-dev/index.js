// Code Execution Sandbox: Development Purposes Only

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {Sandbox} from 'v8-sandbox';
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sandbox = new Sandbox();

app.post('/submissions', async (req, res, next) => {
    const { base64_encoded } = req.query;
    const { source_code, language_id } = req.body;
    if (base64_encoded === 'true') {
        source_code = atob(source_code);
    }

    const { error, value } = await sandbox.execute({ code: source_code, timeout: 5000 });

    if (error) {
        console.log("Code Execution / ERROR: ");
        console.log(error);
        if (error.isTimeout) {
            return res.status(408).json({ message: "Time limit exceeded", stderr: "" })
        } else {
            return res.status(400).json({ message: "An error occured", stderr: error.message })
        }
    }

    res.status(200).json({ stdout: value })
})

const port = 3600;
app.listen(port, () => {

    console.log("_______ _______ __   _ ______  ______   _____  _     _");
    console.log("|______ |_____| | \\  | |     \\ |_____] |     |  \\___/ ");
    console.log("______| |     | |  \\_| |_____/ |_____] |_____| _/   \\_");
    console.log(`[ SERVICE :: CODE EXECUTION SANDBOX ] Development Sandbox is listening on http://localhost:${port}`);
});