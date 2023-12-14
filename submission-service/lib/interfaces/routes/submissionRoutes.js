import express from 'express';
import { RunProblem, SubmitProblem } from '../controllers/SubmissionController.js';
const router = express.Router();

router.post("/runs/:problemId", RunProblem);

router.post("/submissions/:problemId", SubmitProblem);

export default router;