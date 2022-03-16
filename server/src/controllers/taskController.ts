import {Request, Response} from "express";
// use asyncHandler to replace the try..catch..
import asyncHandler from 'express-async-handler';
import {TaskModel} from '../models/taskModel'
import {UserModel} from "../models/userModel";

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

	// task is created by user so will find task by user
	// match with TaskSchema user type
	const tasks = await TaskModel.find({user: req.user._id});

	res.status(200).json(tasks)
})

/**
 * @desc post task
 * @route POST /api/tasks
 * @access private
 */
const createTask = asyncHandler(async (req: Request, res: Response) => {

	const task = await TaskModel.create({
		text: req.body.text,
		// the user create task
		user: req.user._id
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

	const user = await UserModel.findById(req.user._id);



	// check for user
	if (!user) {
		res.status(401)
		throw new Error('User not found in this task')
	}

	// the task is not created by matched user
	if (task.user.toString() !== user.id) {
		res.status(401);
		throw new Error('not matched user on this task')
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


	const user = await UserModel.findById(req.user._id);

	console.log('user: ', user);

	// check for user
	if (!user) {
		res.status(401)
		throw new Error('User not found in this task')
	}


	// the task is not created by matched user
	if (task.user.toString() !== user.id) {
		res.status(401);
		throw new Error('not matched user on this task')
	}

	await TaskModel.findByIdAndDelete(req.params.id);

	res.status(200).json({id: req.params.id});
})


export {getTask, createTask, updateTask, deleteTask }
