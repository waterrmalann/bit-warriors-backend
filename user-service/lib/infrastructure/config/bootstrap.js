import dotenv from 'dotenv';
dotenv.config();

import env from './environment.js';
import connectDB from '../database/setup.js';

export default async function init() {
    console.log(env);
    connectDB();
}