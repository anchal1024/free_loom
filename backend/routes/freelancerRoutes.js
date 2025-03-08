import express from 'express'
import { getFreelancers,updateFreelancerAvailability } from '../controllers/freelancerController.js';

const router = express.Router();

router.get('/',getFreelancers)
router.patch("/:freelancerId", updateFreelancerAvailability);

export default router;