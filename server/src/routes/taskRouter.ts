
import express, {Request, Response} from "express";
import {getTask, createTask, updateTask, deleteTask } from '../controllers/taskController';
import {verifyAuth} from "../middlewares/verifyAuth";

const taskRouter = express.Router();

taskRouter
	.route('/')
	.get(verifyAuth, getTask)
	.post(verifyAuth, createTask);

taskRouter
	.route('/:id')
	.put(verifyAuth, updateTask)
	.delete(verifyAuth, deleteTask);

/*
router.get('/', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
*/

export {taskRouter};
