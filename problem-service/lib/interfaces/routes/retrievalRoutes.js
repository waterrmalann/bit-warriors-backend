import express from 'express';
import { GetProblem, ListProblems } from '../controllers/ProfileController.js';
const router = express.Router();

// GET /problems
router.get('/', ListProblems);
// GET /problems/:problemId
router.get('/:problemId', GetProblem);
// get ...writeups, get ...submissions

export default router;