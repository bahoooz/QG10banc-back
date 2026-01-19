import express from "express";
import { verifySessionToken } from "../auth/auth.middleware.js";
import { getNotes, getPinnedNotes } from "./notes.controller.js";

const router = express.Router();

router.get("/", verifySessionToken, getNotes)
router.get("/pinned", verifySessionToken, getPinnedNotes)

export default router;