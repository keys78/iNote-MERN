import express from "express";
import * as BoardsController from "../controllers/boards";
import { protect } from '../middlewares/authProtect'

const router = express.Router();

router.get('/get-boards', BoardsController.getAllBoards);

router.get('/get-board/:boardId', protect, BoardsController.getSingleBoard);

router.post('/create-board', protect, BoardsController.createBoard);

router.patch('/update-board/:boardId', BoardsController.updateBoard);

router.delete('/delete-board/:boardId', BoardsController.deleteBoard);

export default router;