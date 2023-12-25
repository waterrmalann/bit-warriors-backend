import express from 'express';
import { FindSubmissionsByUser } from '../controllers/QueryController';

const router = express.Router();

// router.get("/leaderboards", GetLeaderboards);

router.get("/submissions/:problemId/:userId", FindSubmissionsByUser);

export default router;