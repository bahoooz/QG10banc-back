import { Request, Response } from "express";
import {
  createNoteService,
  deleteNoteService,
  getNotesService,
  getPinnedNotesService,
  getSpecificNoteService,
  pinNoteService,
  updateNoteService,
} from "./notes.service.js";
import { noteSchema } from "../../schemas/noteSchema.js";
import { AuthRequest } from "../auth/auth.middleware.js";

export const getNotes = async (_req: Request, res: Response) => {
  try {
    const notes = await getNotesService();
    console.log(notes);
    return res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getPinnedNotes = async (_req: Request, res: Response) => {
  try {
    const notes = await getPinnedNotesService();
    console.log(notes);
    return res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = noteSchema.parse(req.body);

    if (!req.user)
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    const authorId = req.user?.id;

    const newNote = createNoteService(validatedData, authorId);

    return res.status(200).json({
      message: "La note a été crée avec succès",
      note: newNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getSpecificNote = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const note = await getSpecificNoteService(slug);
    console.log(note);
    return res.status(200).json(note);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const pinNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pinnedNote = await pinNoteService(Number(id));
    console.log(pinnedNote);
    return res.status(200).json(pinnedNote);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = noteSchema.parse(req.body);
    if (!req.user)
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    const authorId = req.user?.id;

    const updatedNote = await updateNoteService(
      validatedData,
      Number(id),
      authorId,
    );
    console.log(updatedNote);
    return res.status(200).json({
      message: "La note a été mise à jour avec succès",
      note: updatedNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedNote = await deleteNoteService(Number(id));
    console.log(deletedNote);
    return res.status(200).json({
      message: "La note a été supprimée avec succès",
      note: deletedNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
