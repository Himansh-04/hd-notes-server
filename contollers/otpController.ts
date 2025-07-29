import { Request, Response } from 'express';
import { sendOtpEmail } from '../utils/sendOtp';

const otpStore = new Map<string, string>(); // email -> otp

export const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log('📩 Incoming OTP request for:', email); // <--- ADD THIS

  if (!email) return res.status(400).json({ message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  try {
    await sendOtpEmail(email, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('❌ Error sending OTP:', error); // <--- CRUCIAL
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};


export const verifyOtp = (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);

  if (stored && stored === otp) {
    otpStore.delete(email);
    res.status(200).json({ verified: true });
  } else {
    res.status(400).json({ verified: false, message: 'Invalid OTP' });
  }
};
