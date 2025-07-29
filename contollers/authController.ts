import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const signup = async (req: Request, res: Response) => {
  const { name, email, dob } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, dob });

    const token = jwt.sign({ userId: user._id, email }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const token = jwt.sign({ userId: user._id, email }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Signin failed', error: err });
  }
};
