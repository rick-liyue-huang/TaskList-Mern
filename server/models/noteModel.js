
const mongoose = require('mongoose');
const {Schema} = mongoose;

const nodeSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	task: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Task'
	},
	text: {
		type: String,
		required: [true, 'Please input text']
	},
	isManager: {
		type: Boolean,
		default: false
	},
	managerId: {
		type: String,
	}
}, {timestamps: true})

const noteModel = mongoose.model('Note', nodeSchema);

module.exports = {noteModel}
