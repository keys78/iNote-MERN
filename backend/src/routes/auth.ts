import express from "express";
import * as UsersController from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/signup", UsersController.signup);
authRouter.post("/login", UsersController.login);


export default authRouter;