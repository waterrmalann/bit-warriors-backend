import dotenv from 'dotenv';
dotenv.config();

import env from './environment.js';
import connectDB from '../database/setup.js';
import runUserStatsConsumer from '../../interfaces/consumers/UserStatsConsumer.js';

async function init() {
    connectDB();
    runUserStatsConsumer();
}

export default { init };