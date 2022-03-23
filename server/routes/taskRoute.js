
const express = require('express');
const taskRouter = express.Router();
const {authController} = require('../middlewares/authController');
const {
	getTasksController, createTaskController,
	getTaskByIdController, updateTaskByIdController, deleteTaskByIdController
} = require("../controllers/taskController");

taskRouter
	.route('/')
	.get(authController, getTasksController)
	.post(authController, createTaskController)

taskRouter
	.route('/:id')
	.get(authController, getTaskByIdController)
	.put(authController, updateTaskByIdController)
	.delete(authController, deleteTaskByIdController)


module.exports = {taskRouter}
