import nodemailer from 'nodemailer';

export const sendOtpEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"HD Notes" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP for HD Notes',
    text: `Your OTP is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};
