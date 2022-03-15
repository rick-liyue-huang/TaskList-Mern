
import express, {Request, Response} from "express";
import {getTask, createTask, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

router
	.route('/')
	.get(getTask)
	.post(createTask);

router
	.route('/:id')
	.put(updateTask)
	.delete(deleteTask);

/*
router.get('/', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
*/

export default router;
