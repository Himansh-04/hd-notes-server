"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const otpRoutes_1 = __importDefault(require("./routes/otpRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('HD Notes API is running ✅');
});
app.use('/api/notes', noteRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/otp', otpRoutes_1.default);
// MongoDB Connection
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
    .catch((err) => console.error('❌ MongoDB connection error:', err));
app.use('/api/otp', otpRoutes_1.default);
