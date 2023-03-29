import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

router.get("/get-all-notes", NotesController.getNotes);

router.get("/get-note/:noteId", NotesController.getNote);

router.post("/create-note/:boardId", NotesController.createNote);

router.patch("/update-note/:noteId", NotesController.updateNote);

router.delete("/deleteNote/:boardId/:noteId", NotesController.deleteNote);

export default router;