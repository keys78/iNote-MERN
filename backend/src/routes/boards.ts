import express from "express";
import * as BoardsController from "../controllers/boards";
import { protect } from '../middlewares/authProtect'

const router = express.Router();

router.get('/get-board/:boardId', protect, BoardsController.getSingleBoard);

router.post('/create-board', protect, BoardsController.createBoard);

router.patch('/edit-board/:boardId',protect, BoardsController.updateBoard);

router.delete('/delete-board/:boardId',protect, BoardsController.deleteBoard);

export default router;