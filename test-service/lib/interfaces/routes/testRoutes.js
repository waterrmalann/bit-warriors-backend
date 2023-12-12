import express from 'express';
import { Evaluate, RunTests } from '../controllers/TestController.js';
const router = express.Router();

router.post('/run-tests', RunTests);

router.post('/evaluate', Evaluate);

export default router;