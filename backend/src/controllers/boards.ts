import { RequestHandler } from "express";
import createHttpError from "http-errors";
import BoardModel from "../models/board";
import UserModel from "../models/user";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

export const getAllBoards: RequestHandler = async (req, res, next) => {

    try {
        const boards = await BoardModel.find()
            .populate({
                path: 'notes',
                select:
                    'title',
            })
            .exec();
        res.status(200).json(boards);
    } catch (error) {
        next(error);
    }
};

// export const getSingleBoard: RequestHandler = async (req, res, next) => {
//     const boardId = req.params.boardId;

//     try {

//         if (!mongoose.isValidObjectId(boardId)) {
//             throw createHttpError(400, "invalid board id")
//         }

//         const board = await BoardModel.findById(boardId)
//             .populate({
//                 path: 'notes',
//                 select:
//                     'title',
//             })
//             .exec();

//         if (!board) {
//             throw createHttpError(404, "board not found");
//         }

//         res.status(200).json(board);
//     } catch (error) {
//         next(error);
//     }
// };

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
  
      const board = await BoardModel.findById(boardId).populate({
        path: "notes",
        select: "title",
      });
  
      if (!board) {
        throw createHttpError(404, "board not found");
      }
  
      // Check if the user is authorized to access the board
      if (board.user.toString() !== userId) { 
        throw createHttpError(403, "unauthorized to access board");
      }
  
      res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  };
  



interface CreateNoteBody {
    title?: string,
    user?: string
}

export const createBoard: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const { title } = req.body

    try {
        if (!title) {
            throw createHttpError(400, "title is required")
        }
        const newBoard = await BoardModel.create({
            title: title,
            user: "640b6ce27d42feb7036c7dce"
        });

        await UserModel.updateOne({ _id: newBoard.user }, { $push: { boards: newBoard._id } });

        res.status(201).json(newBoard);
    } catch (error) {
        next(error);
    }
};

interface UpdateBoardParams {
    boardId: string
}

interface UpdateBoardBody {
    title: string,
    text: string
}

export const updateBoard: RequestHandler<UpdateBoardParams, unknown, UpdateBoardBody, unknown> = async (req, res, next) => {
    const boardId = req.params.boardId;
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

        const updatedBoard = await board.save();

        res.status(200).json({ data: updatedBoard, message: "board updated successfully" });
    } catch (error) {
        next(error);
    }
};


export const deleteBoard: RequestHandler = async (req, res, next) => {
    const boardId = req.params.boardId;

    try {

        if (!mongoose.isValidObjectId(boardId)) {
            throw createHttpError(400, "Invalid board id");
        }

        const note = await BoardModel.findById(boardId).exec();

        if (!note) {
            throw createHttpError(404, "Board not found");
        }

        await BoardModel.findByIdAndDelete({ _id: boardId })
        await UserModel.updateOne({ _id: "640b6ce27d42feb7036c7dce" }, { $pull: { boards: boardId } });

        res.status(200).json({ message: "board deleted successfully" });


    } catch (error) {
        next(error);
    }
};