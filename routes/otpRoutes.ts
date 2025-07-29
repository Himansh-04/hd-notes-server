import express from 'express';
import { requestOtp, verifyOtp } from '../contollers/otpController';

const router = express.Router();

router.post('/send', requestOtp);
router.post('/verify', verifyOtp);

export default router;
