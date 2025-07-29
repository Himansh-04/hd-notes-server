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
exports.deleteNote = exports.createNote = exports.getNotes = void 0;
const Note_1 = __importDefault(require("../models/Note"));
// GET /api/notes?email=user@example.com
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.query.email;
        const notes = yield Note_1.default.find({ userEmail });
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch notes', error });
    }
});
exports.getNotes = getNotes;
// POST /api/notes
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, userEmail } = req.body;
        const newNote = yield Note_1.default.create({ title, content, userEmail });
        res.status(201).json(newNote);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create note', error });
    }
});
exports.createNote = createNote;
// DELETE /api/notes/:id
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Note_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete note', error });
    }
});
exports.deleteNote = deleteNote;
