import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

router.get("/get-all-notes", NotesController.getNotes);

router.get("/get-note/:noteId", NotesController.getNote);

router.post("/create-note/:id", NotesController.createNote);

router.patch("/update-note/:noteId", NotesController.updateNote);

router.delete("/delete-note/:noteId", NotesController.deleteNote);

export default router;