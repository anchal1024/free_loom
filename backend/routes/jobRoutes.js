import express from 'express';
import { postJob, getJobs, applyForJob, getJobRequests, respondToJobRequest, updateJobStatus } from '../controllers/jobController.js';

const router = express.Router();

router.post('/post', postJob);
router.get('/', getJobs);
router.post("/apply", applyForJob);
router.get("/requests/:clientId", getJobRequests);
router.patch("/request/respond", respondToJobRequest);
router.patch("/:jobId", updateJobStatus);




export default router;
