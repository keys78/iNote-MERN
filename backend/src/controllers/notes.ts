import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";
import BoardModel from "../models/board";
// import ColumnModel from '../models/column'


export const getNotes: RequestHandler = async (req, res, next) => {

    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "invalid note id")
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody {
    title?: string,
    description?: string
}

export const createNote: RequestHandler<any, any, CreateNoteBody, any> = async (req, res, next) => {
    const { title, description } = req.body

    try {
        if (!title) {
            throw createHttpError(400, "title is required")
        }
        const newNote = await NoteModel.create({
            title: title,
            description: description,
            boardId: req?.params.boardId
        });

        await BoardModel.updateOne({ _id: newNote.boardId }, { $push: { notes: newNote._id } });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};


interface UpdateNoteParams {
    noteId: string
}

interface UpdateNoteBody {
    title: string,
    description: string
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.description;

    try {

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        note.title = newTitle;
        note.description = newText;

        const updatedNote = await note.save();

        res.status(200).json({ data: updatedNote, message: "note updated successfully" });
    } catch (error) {
        next(error);
    }
};



export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        await NoteModel.findByIdAndDelete({ _id: noteId })
        await BoardModel.updateOne({ _id: "640e17e77a55d6340df43ff1" }, { $pull: { notes: noteId } });

        res.status(200).json({ message: "note deleted successfully" });


    } catch (error) {
        next(error);
    }
};