
import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please add name']
	},
	email: {
		type: String,
		required: [true, 'Please add Email address'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Please add password']
	}
}, {
	timestamps: true
});


export const UserModel = mongoose.model('User', UserSchema);
