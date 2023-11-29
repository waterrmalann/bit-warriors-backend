import dotenv from 'dotenv';
dotenv.config();

import env from './environment.js';
import connectDB from '../database/setup.js';
import runProblemConsumer from '../../interfaces/consumers/ProblemConsumer.js';

async function init() {
    await connectDB();
    await runProblemConsumer();
}

export default { init };