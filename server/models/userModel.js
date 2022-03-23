
const mongoose = require('mongoose');
const {Schema} = mongoose;

/**
 * @desc create user schema through mongoose and then user model in mongodb
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, any, any>}
 */
const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please input name']
	},
	email: {
		type: String,
		required: [true, 'Please input email'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Please input password']
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	}
}, {
	timestamps: true
});

const userModel = mongoose.model('User', userSchema);

module.exports = {userModel}



