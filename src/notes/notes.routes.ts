import express from "express";
import { verifySessionToken } from "../auth/auth.middleware.js";
import { createNote, deleteNote, getNotes, getPinnedNotes, getSpecificNote, pinNote, updateNote } from "./notes.controller.js";

const router = express.Router();

router.get("/", verifySessionToken, getNotes)
router.get("/pinned", verifySessionToken, getPinnedNotes)
router.post("/create", verifySessionToken, createNote)
router.get("/:slug", verifySessionToken, getSpecificNote)
router.patch("/pin/:id", verifySessionToken, pinNote)
router.put("/update/:id", verifySessionToken, updateNote)
router.delete("/delete/:id", verifySessionToken, deleteNote)
export default router;