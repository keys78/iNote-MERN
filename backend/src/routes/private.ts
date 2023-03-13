import express from "express";
import * as PrivateController from "../controllers/private";
import { protect } from "../middlewares/authProtect";

const usersRouter = express.Router();

usersRouter.get("/get-all-users", protect, PrivateController.getAllUsers);
usersRouter.get("/get-user/:id", protect, PrivateController.getUser);


export default usersRouter;











