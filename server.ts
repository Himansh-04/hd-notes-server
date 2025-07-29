import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes';
import authRoutes from './routes/authRoutes';
import otpRoutes from './routes/otpRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('HD Notes API is running ✅');
});

app.use('/api/notes', noteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
