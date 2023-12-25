import { RequestFeedback } from '../controllers/AIController.js';
import express from 'express';
const router = express.Router();

router.post("/feedbacks/:submissionId", RequestFeedback);

// router.get("/feedbacks/:submissionId", GetFeedback);

export default router;