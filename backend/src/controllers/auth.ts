/* eslint-disable no-case-declarations */
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import jwt, { JwtPayload }  from 'jsonwebtoken';

interface createUser {
    username?: string,
    email?: string,
    password?:string
}


// export const signup: RequestHandler<unknown, unknown, createUser, unknown> = async (req, res, next) => {
//     const { username, email, password } = req.body
  
//     try {
//       if (!username) {
//         throw createHttpError(400, "username is required")
//       }
//       if (!email) {
//         throw createHttpError(400, "email is required")
//       }
//       if (!password) {
//         throw createHttpError(400, "password is required")
//       }
  
//       const isUserRegistered = await UserModel.findOne({ email })
//       if (isUserRegistered) {
//         throw createHttpError(401, "account already exists, try logging in")
//       }
  
//       const user = await UserModel.create({
//         username: username,
//         email: email,
//         password: password
//       })
  
//       // const token = await new Token({
//       //     userId: user._id,
//       //     token: crypto.randomBytes(32).toString("hex"),
//       // }).save();
  
//       // const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
  
//       // await sendEmail({
//       //     to: user.email,
//       //     subject: "Email Verification",
//       //     text: confirmEmailMessage(url)
//       // });
  
//       res.json({
//         success: true,
//         message: `Hi ${user.username}, your signup was successful, Kindly confirm the verification email sent to you.`,
//         status: 201
//       })
//     } catch (error) {
//       next(error)
//     }
//   }


// export const signup: RequestHandler<unknown, unknown, createUser, unknown> = async (req, res, next) => {
//     const { username, email, password } = req.body
  
//     try {
//       switch (true) {
//         case !username:
//           throw createHttpError(400, "username is required")
//           break
//         case !email:
//           throw createHttpError(400, "email is required")
//           break
//         case !password:
//           throw createHttpError(400, "password is required")
//           break
//         default:
//           const isUserRegistered = await UserModel.findOne({ email })
//           if (isUserRegistered) {
//             throw createHttpError(401, "account already exists, try logging in")
//           }
  
//           const user = await UserModel.create({
//             username: username,
//             email: email,
//             password: password
//           })
  
//           // const token = await new Token({
//           //     userId: user._id,
//           //     token: crypto.randomBytes(32).toString("hex"),
//           // }).save();
  
//           // const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
  
//           // await sendEmail({
//           //     to: user.email,
//           //     subject: "Email Verification",
//           //     text: confirmEmailMessage(url)
//           // });
  
//           res.json({
//             success: true,
//             message: `Hi ${user.username}, your signup was successful, Kindly confirm the verification email sent to you.`,
//             status: 201
//           })
//           break
//       }
//     } catch (error) {
//       next(error)
//     }
//   }


export const signup: RequestHandler<unknown, unknown, createUser, unknown> = async (req, res, next) => {
    const { username, email, password } = req.body
  
    try {
      switch (true) {
        case !username:
          throw createHttpError(400, "username is required")
        case !email:
          throw createHttpError(400, "email is required")
        case !password:
          throw createHttpError(400, "password is required")
        default:
          const isUserRegistered = await UserModel.findOne({ email })
          if (isUserRegistered) {
            throw createHttpError(401, "account already exists, try logging in")
          }
  
          const user = await UserModel.create({
            username: username,
            email: email,
            password: password
          })
  
          // const token = await new Token({
          //     userId: user._id,
          //     token: crypto.randomBytes(32).toString("hex"),
          // }).save();
  
          // const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
  
          // await sendEmail({
          //     to: user.email,
          //     subject: "Email Verification",
          //     text: confirmEmailMessage(url)
          // });
  
          res.json({
            success: true,
            message: `Hi ${user.username}, your signup was successful, Kindly confirm the verification email sent to you.`,
            status: 201
          })
          break
      }
    } catch (error) {
      next(error)
    }
  }
  
  
  



export const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw (createHttpError(400, 'Please provide an email and password'))
    }

    try {
        const user = await UserModel.findOne({ email }).select("+password")

        if (!user) {
            // throw (createHttpError (401, 'Invalid Credentials'))
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        // if (!user.verified) {
        //     const unusedToken = await Token.findOne({
        //         userId: user._id,
        //     });

        //     if(unusedToken !== null) {
        //         await unusedToken.remove();
        //     }

            
        //     const token = await new Token({
        //         userId: user._id,
        //         token: crypto.randomBytes(32).toString("hex"),
        //     }).save();

        //     const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;

        //     await sendEmail({
        //         to: user.email,
        //         subject: "Email Verification",
        //         text: confirmEmailMessage(url)
        //     });


        //     return next(new ErrorResponse('please confirm the verification email sent to you.', 401))

        // }

        
        sendToken(user, 200, res);

    } catch (error) {
        next(error)
    }
};


const sendToken = async (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, data: user.username, token });
};

