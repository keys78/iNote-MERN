import express from "express";
import * as PrivateController from "../controllers/private";
import { protect } from "../middlewares/authProtect";

const usersRouter = express.Router();

usersRouter.get("/all-users", protect, PrivateController.getAllUsers);
usersRouter.get("/user", protect, PrivateController.getUser);
usersRouter.post("/changepassword/:userId", protect, PrivateController.changePassword);



export default usersRouter;











