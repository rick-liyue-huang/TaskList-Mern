import {Request, Response} from "express";
// use asyncHandler to replace the try..catch..
import asyncHandler from 'express-async-handler'

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

	res.status(200).json({
		message: `get task`
	})
})

/**
 * @desc post task
 * @route POST /api/tasks
 * @access private
 */
const createTask = asyncHandler(async (req: Request, res: Response) => {
	res.status(200).json({
		message: 'create task'
	})
})

/**
 * @desc update task
 * @route PUT /api/tasks
 * @access private
 */
const deleteTask = asyncHandler(async (req: Request, res: Response) => {
	res.status(200).json({
		message: `delete task on ${req.params.id}`
	});
})

/**
 * @desc delete task
 * @route DELETE /api/tasks
 * @access private
 */
const updateTask = asyncHandler(async (req: Request, res: Response) => {
	res.status(200).json({
		message: `update task on ${req.params.id}`
	})
})



export {getTask, createTask, updateTask, deleteTask }
