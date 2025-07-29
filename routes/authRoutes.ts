import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signin', async (req, res) => {
  const { email } = req.body;

  try {
    // You can verify the email exists in DB, but for now just respond
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.status(200).json({
      user: { email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

export default router;
