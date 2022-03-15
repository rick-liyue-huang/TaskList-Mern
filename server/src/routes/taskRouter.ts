
import express, {Request, Response} from "express";
import {getTask, createTask, updateTask, deleteTask } from '../controllers/taskController';

const taskRouter = express.Router();

taskRouter
	.route('/')
	.get(getTask)
	.post(createTask);

taskRouter
	.route('/:id')
	.put(updateTask)
	.delete(deleteTask);

/*
router.get('/', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
*/

export {taskRouter};
