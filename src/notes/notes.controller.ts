import { Request, Response } from "express";
import { getNotesService, getPinnedNotesService } from "./notes.service.js";

export const getNotes = async (_req: Request, res: Response) => {
  try {
    const notes = await getNotesService()
    console.log(notes);
    return res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getPinnedNotes = async (_req: Request, res: Response) => {
  try {
    const notes = await getPinnedNotesService()
    console.log(notes);
    return res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};