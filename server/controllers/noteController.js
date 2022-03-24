

const asyncHandler = require('express-async-handler');
const {userModel} = require("../models/userModel");
const {taskModel} = require('../models/taskModel');
const {noteModel} = require('../models/noteModel')


/**
 * @desc get the notes by task id
 * @route GET  /api/tasks/:taskId/notes
 */
const getNotesController = asyncHandler(async (req, res) => {

	// get user info by id in JWT
	const user = await userModel.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found')
	}

	const task = await taskModel.findById((req.params.taskId));

	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized')
	}

	const notes = await noteModel.find({task: req.params.taskId});

	res.status(200).json(notes);
});

/**
 * @desc create note by taskId
 * @route POST GET  /api/tasks/:taskId/notes
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const createNoteController = asyncHandler(async (req, res) => {

	// get user info by id in JWT
	const user = await userModel.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found')
	}

	const task = await taskModel.findById((req.params.taskId));

	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized')
	}

	const note = await noteModel.create({
		text: req.body.text,
		isManager: false,
		task: req.params.taskId,
		user: req.user.id
	});

	res.status(200).json(note);
});



module.exports = {getNotesController, createNoteController}

