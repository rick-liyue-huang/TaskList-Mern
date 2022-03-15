import {Request, Response} from "express";
// use asyncHandler to replace the try..catch..
import asyncHandler from 'express-async-handler';
import {TaskModel} from '../models/taskModel'

/**
 * @desc get task
 * @route GET /api/tasks
 * @access private
 */
const getTask = asyncHandler(async (req: Request, res: Response) => {

	/*
	if (!req.body.text) {
		// res.status(400);
		// the error will throw to the errorHandler middleware
		// because here no res.status, the middleware will recognize res.status(500) and send the error message
		throw new Error('need text');
	}
	*/

	const tasks = await TaskModel.find();

	res.status(200).json(tasks)
})

/**
 * @desc post task
 * @route POST /api/tasks
 * @access private
 */
const createTask = asyncHandler(async (req: Request, res: Response) => {

	const task = await TaskModel.create({
		text: req.body.text
	})
	res.status(200).json(task)
});

/**
 * @desc delete task
 * @route PUT /api/tasks
 * @access private
 */
const updateTask = asyncHandler(async (req: Request, res: Response) => {

	const task = await TaskModel.findById(req.params.id);

	if (!task) {
		res.status(400);
		throw new Error('Task not found')
	}
	const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

	res.status(200).json(updatedTask)
})

/**
 * @desc update task
 * @route DELETE /api/tasks
 * @access private
 */
const deleteTask = asyncHandler(async (req: Request, res: Response) => {

	const task = await TaskModel.findById(req.params.id);

	if (!task) {
		res.status(400);
		throw new Error('Task not found')
	}

	await TaskModel.findByIdAndDelete(req.params.id);

	res.status(200).json({id: req.params.id});
})


export {getTask, createTask, updateTask, deleteTask }
