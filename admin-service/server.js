import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = 4000;
app.listen(port, () => {
    console.log(`[ SERVICE :: ADMIN SERVICE ] Administrator Service is listening on http://localhost:${port}`);
});