/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, RequestHandler, Response, Request } from "express";
import createHttpError from "http-errors";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import UsersModel from "../models/user";


export const getAllUsers: RequestHandler = async (req, res, next) => {

    try {
        const users = await UsersModel.find().exec();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};



interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}


export const getUser: RequestHandler<{}, any, any, { id?: string }> = async (req: AuthRequest, res: Response<any>, next: NextFunction) => {
    const id = req.user?.id;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(404, "invalid user id");
        }

        const user = await UsersModel.findById(id)
            .populate({
                path: 'boards',
                select:
                    'title text',
            })
            .populate({
                path: 'boards',
                populate: { path: 'notes', select: 'title text' }
            })
            .exec();

        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

// const updateUser
















// const { id } = req.params;

// const userWithStats = await User.aggregate([
//   { $match: { _id: new mongoose.Types.ObjectId(id) } },
//   {
//     $lookup: {
//       from: "affiliatestats",
//       localField: "_id",
//       foreignField: "userId",
//       as: "affiliateStats",
//     },
//   },
//   { $unwind: "$affiliateStats" },
// ]);