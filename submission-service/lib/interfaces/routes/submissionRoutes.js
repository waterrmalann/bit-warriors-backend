import express from 'express';
import { RunProblem, SubmitProblem } from '../controllers/SubmissionController.js';
const router = express.Router();

router.post("/runs", RunProblem);

router.post("/submissions", SubmitProblem);

export default router;