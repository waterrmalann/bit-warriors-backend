import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = 3001;
app.listen(port, () => {
    console.log(`[ SERVICE :: USER SERVICE ] User Service is listening on http://localhost:${port}`);
});