import { RequestHandler } from "express";
import createHttpError from "http-errors";
import BoardModel from "../models/board";
import UserModel from "../models/user";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";


interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}


// eslint-disable-next-line @typescript-eslint/ban-types
export const getSingleBoard: RequestHandler<{}, unknown, unknown, { id?: string }> = async (req: AuthRequest, res: Response<unknown>, next: NextFunction) => {
    const userId = req.user?.id;
    const boardId = req.params.boardId;

    try {
        if (!mongoose.isValidObjectId(boardId)) {
            throw createHttpError(400, "invalid board id");
        }

        const board = await BoardModel.findById(boardId)
            .populate({
                path: "notes",
                select: "title description status subTasks reviewApp",
            });

        if (!board) {
            throw createHttpError(404, "board not found");
        }

        // Check if the user is authorized to access the board
        if (board.userId.toString() !== userId) {
            throw createHttpError(403, "unauthorized to access board");
        }

        res.status(200).json(board);
    } catch (error) {
        next(error);
    }
};



// eslint-disable-next-line @typescript-eslint/ban-types
export const createBoard: RequestHandler<{}, unknown, unknown, { id?: string }> = async (req: AuthRequest, res: Response<unknown>, next: NextFunction) => {
    const userId = req.user?.id;
    const { title } = req.body

    try {
        if (!title) {
            throw createHttpError(400, "title is required")
        }
        const newBoard = await BoardModel.create({
            title: title,
            userId: userId
        });

        await UserModel.updateOne({ _id: newBoard.userId }, { $push: { boards: newBoard._id } });

        res.status(201).json(newBoard);
    } catch (error) {
        next(error);
    }
};



// export const updateBoard: RequestHandler<UpdateBoardParams, unknown, UpdateBoardBody, unknown> = async (req, res, next) => {
export const updateBoard: RequestHandler = async (req, res, next) => {

    const boardId = req?.params?.boardId;
    const newTitle = req.body.title;

    try {

        if (!mongoose.isValidObjectId(boardId)) {
            throw createHttpError(400, "Invalid board id");
        }

        if (!newTitle) {
            throw createHttpError(400, "Board must have a title");
        }

        const board = await BoardModel.findById(boardId).exec();

        if (!board) {
            throw createHttpError(404, "Board not found");
        }

        board.title = newTitle;

        await board.save();

        res.status(200).json({ message: "board updated successfully" });
    } catch (error) {
        next(error);
    }
};


// eslint-disable-next-line @typescript-eslint/ban-types
export const deleteBoard: RequestHandler<{}, unknown, unknown, { id?: string }> = async (req: AuthRequest, res: Response<unknown>, next: NextFunction) => {
    const userId = req.user?.id;
    const boardId = req.params.boardId;

    try {

        if (!mongoose.isValidObjectId(boardId)) {
            throw createHttpError(400, "Invalid board id");
        }

        const note = await BoardModel.findById(boardId).exec();

        if (!note) {
            throw createHttpError(404, "Board not found");
        }

        const deleteBoard = await BoardModel.findByIdAndDelete({ _id: boardId })
        await UserModel.updateOne({ _id: userId }, { $pull: { boards: boardId } });

        res.status(200).json({ message: `${deleteBoard?.title} board deleted` });


    } catch (error) {
        next(error);
    }
};