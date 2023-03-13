import express from "express";
import * as BoardsController from "../controllers/boards";

const router = express.Router();

router.get('/get-boards', BoardsController.getAllBoards);

router.get('/get-single-board/:boardId',BoardsController.getSingleBoard);

router.post('/create-board/:id', BoardsController.createBoard);

router.patch('/update-board/:boardId', BoardsController.updateBoard);

router.delete('/delete-board/:boardId', BoardsController.deleteBoard);

export default router;