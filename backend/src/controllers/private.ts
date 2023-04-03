/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, RequestHandler, Response, Request } from "express";
import createHttpError from "http-errors";
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
                select: 'title',
                populate: {
                    path: 'notes',
                    select: 'title description status subTasks '
                }
            })
            .exec();

        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}


// export const changePassword: RequestHandler = async (req, res, next) => {
//     const { newPassword, password } = req.body;
//     const { userId } = req.params;

//     try {
//         const user = await UsersModel.findById({ _id: userId }).select('+password');

//         if (!user) {
//             return res.status(400).send({ message: "User not found" });
//         }

//         const isMatch = await user.matchPasswords(password);
//         if (!isMatch) {
//             return res.status(400).send({ message: "Please enter correct old password" });
//         }
//         console.log("newPassword:", newPassword);
//         console.log("password:", password);

//         user.password = newPassword
//         await user.save();

//         return res.json({ data: 'password update was successful' });
//     } catch (err) {
//         next(err);
//     }
// };
export const changePassword: RequestHandler = async (req, res, next) => {
    try {
      const { newPassword, password } = req.body;
      const { userId } = req.params;
  
      const user = await UsersModel.findById(userId).select('+password');
  
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
  
      const isMatch = await user.matchPasswords(password);
  
      if (!isMatch) {
        return res.status(400).send({ message: 'Please enter correct old password' });
      }
  
      user.password = newPassword;
      await user.save();
  
      return res.json({ data: 'Password update was successful' });
    } catch (err) {
      next(err);
    }
  };
  