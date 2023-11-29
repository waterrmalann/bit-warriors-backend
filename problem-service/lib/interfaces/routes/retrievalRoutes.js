import express from 'express';
import { GetProblem } from '../controllers/ProfileController.js';
const router = express.Router();

router.get('/:problemId', GetProblem);
// get ...writeups, get ...submissions

export default router;