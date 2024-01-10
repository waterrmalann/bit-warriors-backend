import express from 'express';
import { FindSubmissionsByUser, GetLeaderboards } from '../controllers/QueryController.js';

const router = express.Router();

router.get("/leaderboards", GetLeaderboards);
router.get("/submissions/:problemId/:userId", FindSubmissionsByUser);

export default router;