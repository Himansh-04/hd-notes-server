"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpController_1 = require("../contollers/otpController");
const router = express_1.default.Router();
router.post('/send', otpController_1.requestOtp);
router.post('/verify', otpController_1.verifyOtp);
exports.default = router;
