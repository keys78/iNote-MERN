import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken"
import UserModel from "../models/user"

export const protect: RequestHandler = async (req, res, next) => {
    let token: string;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized to access this routey' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById((decoded as JwtPayload).id);

        if (!user) {
            throw createHttpError(401, 'No user found with this id');
        }

        if ('user' in req) {
            req.user = user;
        }


        next();
    } catch (error) {
        throw createHttpError(401, 'Not authorized to access this routepp');
    }
}


// if ('user' in req) {
//     req.user = user;

// } else {
//     // throw createHttpError(401, 'Not authorized to access this routei');
//     // throw createHttpError(401, 'Not authorized to access this routei');
// }


// import { RequestHandler } from "express";
// import createHttpError from "http-errors";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import UserModel from "../models/user";

// interface AuthRequest extends Request {
//     user?: any;
//   }

//   export const protect: RequestHandler = async (req: AuthRequest, res, next) => {
//     const token: string | undefined = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ error: 'Not authorized to access this route' });
//     }

//     try {
//         const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
//         const user = await UserModel.findById(decoded.id);

//         if (!user) {
//             throw createHttpError(401, 'No user found with this id');
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         throw createHttpError(401, 'Not authorized to access this route');
//     }
// };