"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.requestOtp = void 0;
const sendOtp_1 = require("../utils/sendOtp");
const otpStore = new Map(); // email -> otp
const requestOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    console.log('📩 Incoming OTP request for:', email); // <--- ADD THIS
    if (!email)
        return res.status(400).json({ message: 'Email is required' });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);
    try {
        yield (0, sendOtp_1.sendOtpEmail)(email, otp);
        res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch (error) {
        console.error('❌ Error sending OTP:', error); // <--- CRUCIAL
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});
exports.requestOtp = requestOtp;
const verifyOtp = (req, res) => {
    const { email, otp } = req.body;
    const stored = otpStore.get(email);
    if (stored && stored === otp) {
        otpStore.delete(email);
        res.status(200).json({ verified: true });
    }
    else {
        res.status(400).json({ verified: false, message: 'Invalid OTP' });
    }
};
exports.verifyOtp = verifyOtp;
