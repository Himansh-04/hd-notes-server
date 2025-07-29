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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, dob } = req.body;
    try {
        const existing = yield User_1.default.findOne({ email });
        if (existing)
            return res.status(400).json({ message: 'User already exists' });
        const user = yield User_1.default.create({ name, email, dob });
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email }, JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, user });
    }
    catch (err) {
        res.status(500).json({ message: 'Signup failed', error: err });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'User not found' });
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email }, JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token, user });
    }
    catch (err) {
        res.status(500).json({ message: 'Signin failed', error: err });
    }
});
exports.signin = signin;
