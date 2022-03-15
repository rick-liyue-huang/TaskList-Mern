
import mongoose from "mongoose";


const {Schema} = mongoose;

/**
 * @desc create TaskSchema
 */
const TaskSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	//	add reference
		ref: 'UserModel'
	},
	text: {
		type: String,
		required: [true, 'please add a text']
	}
}, {
	// add createdAt and updatedAt
	timestamps: true
});

/**
 * @desc create TaskModel
 */
export const TaskModel = mongoose.model('Task', TaskSchema);
