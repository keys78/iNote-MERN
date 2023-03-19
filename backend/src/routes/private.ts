import express from "express";
import * as PrivateController from "../controllers/private";
import { protect } from "../middlewares/authProtect";
import { isTokenBlacklisted } from "../middlewares/blacklistAuth";

const usersRouter = express.Router();

usersRouter.get("/all-users", protect, PrivateController.getAllUsers);
usersRouter.get("/user", isTokenBlacklisted, protect, PrivateController.getUser);


export default usersRouter;











