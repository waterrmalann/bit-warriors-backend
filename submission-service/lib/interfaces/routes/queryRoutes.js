import express from 'express';
import { FindAllSubmissionsByUser, FindSubmissionsByUser, GetLeaderboards } from '../controllers/QueryController.js';
const router = express.Router();

router.get("/leaderboards", GetLeaderboards);
router.get("/submissions/:problemId/:userId", FindSubmissionsByUser);
router.get("/submissions/:userId", FindAllSubmissionsByUser);

export default router;