import express from 'express';
import { registerFreelancer, registerClient, loginUser } from '../controllers/authController.js';
const router = express.Router();

router.post('/register/freelancer', registerFreelancer);
router.post('/register/client', registerClient);
router.post('/login', loginUser);

export default router;