
const asyncHandler = require('express-async-handler');
const {userModel} = require("../models/userModel");
const {taskModel} = require('../models/taskModel');


/**
 * @desc get the task by user id
 * @route GET  /api/tasks
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const getTasksController = asyncHandler(async (req, res) => {

	// get user info by id in JWT
	const user = await userModel.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found')
	}

	const tasks = await taskModel.find({user: req.user.id});

	res.status(200).json(tasks)
});


/**
 * @desc create task after login or register
 * @route POST /api/tasks
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const createTaskController = asyncHandler(async (req, res) => {

	const {title, description} = req.body;

	if (!title || !description) {
		res.status(400);
		throw new Error('Please input task and its description')
	}

	// get user info by id in JWT
	const user = await userModel.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found')
	}

	const task = await taskModel.create({
		title,
		description,
		user: req.user.id,
		status: 'new'
	})


	res.status(200).json(task)
});

/**
 * @desc get task by id after login or register
 * @route GET '/api/tasks/:id
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const getTaskByIdController = asyncHandler(async (req, res) => {
	// get user info by id in JWT
	const user = await userModel.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found')
	}

	const singleTask = await taskModel.findById(req.params.id);

	if (!singleTask) {
		res.status(404);
		throw new Error('Task not found')
	}

	if (singleTask.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('No authorized')
	}

	res.status(200).json(singleTask)
})


/**
 * @desc delete task by id after login or register
 * @route DELETE '/api/tasks/:id
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const deleteTaskByIdController = asyncHandler(async (req, res) => {
	// get user info by id in JWT
	const user = await userModel.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found')
	}

	const singleTask = await taskModel.findById(req.params.id);

	if (!singleTask) {
		res.status(404);
		throw new Error('Task not found')
	}

	if (singleTask.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('No authorized')
	}

	// delete the task in database
	await singleTask.remove();

	res.status(200).json({success: true})
})


/**
 * @desc update task by id after login or register
 * @route PUT '/api/tasks/:id
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const updateTaskByIdController = asyncHandler(async (req, res) => {
	// get user info by id in JWT
	const user = await userModel.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found')
	}

	const singleTask = await taskModel.findById(req.params.id);

	if (!singleTask) {
		res.status(404);
		throw new Error('Task not found')
	}

	if (singleTask.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('No authorized')
	}

	const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	})

	res.status(200).json({success: true})
})




module.exports = {getTasksController, createTaskController,
	getTaskByIdController, deleteTaskByIdController, updateTaskByIdController}

