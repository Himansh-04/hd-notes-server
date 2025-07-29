import { Request, Response } from 'express';
import Note from '../models/Note';

// GET /api/notes?email=user@example.com
export const getNotes = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email as string;
    const notes = await Note.find({ userEmail });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes', error });
  }
};

// POST /api/notes
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content, userEmail } = req.body;
    const newNote = await Note.create({ title, content, userEmail });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create note', error });
  }
};

// DELETE /api/notes/:id
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete note', error });
  }
};
