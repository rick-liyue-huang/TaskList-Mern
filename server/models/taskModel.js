
const mongoose = require('mongoose');

const {Schema} = mongoose;

/**
 * @desc create task schema
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, any, any>}
 */
const taskSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	title: {
		type: String,
		required: [true, 'Please choose one product'],
		// enum: ['IPhone', 'Macbook Pro', 'IMac', 'IPad']
	},
	description: {
		type: String,
		required: [true, 'Please enter description']
	},
	status: {
		type: String,
		required: true,
		enum: ['new', 'processing', 'completed'],
		default: 'new'
	}
}, {
	timestamps: true
});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = {taskModel}
