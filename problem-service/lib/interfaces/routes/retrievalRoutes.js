import express from 'express';
import { GetProblem, ListProblems, GetRandomProblem } from '../controllers/ProblemController.js';
const router = express.Router();

// GET /problems
router.get('/', ListProblems);
// GET /problems/random
router.get('/random', GetRandomProblem);
// GET /problems/:problemId
router.get('/:problemId', GetProblem);
// get ...writeups, get ...submissions

export default router;