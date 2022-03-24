
const express = require('express');
const {authController} = require('../middlewares/authController')
const {getNotesController, createNoteController} = require('../controllers/noteController');

// api/tasks/:taskId/notes
const noteRouter = express.Router({mergeParams: true});


noteRouter
	.route('/')
	.get(authController, getNotesController)
	.post(authController, createNoteController)

module.exports = {noteRouter}
