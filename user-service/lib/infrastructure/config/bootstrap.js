import dotenv from 'dotenv';
dotenv.config();

import env from './environment.js';
import connectDB from '../database/setup.js';

async function init() {
    connectDB();
}

export default { init };