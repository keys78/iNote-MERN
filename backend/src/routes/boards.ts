import express from "express";
import * as BoardsController from "../controllers/boards";
import { protect } from '../middlewares/authProtect'
import { isTokenBlacklisted } from "../middlewares/blacklistAuth";

const router = express.Router();

router.get('/get-boards', BoardsController.getAllBoards);

router.get('/get-board/:boardId', isTokenBlacklisted, protect, BoardsController.getSingleBoard);

router.post('/create-board/:id', BoardsController.createBoard);

router.patch('/update-board/:boardId', BoardsController.updateBoard);

router.delete('/delete-board/:boardId', BoardsController.deleteBoard);

export default router;