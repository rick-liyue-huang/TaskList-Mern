
import mongoose from "mongoose";

const {Schema} = mongoose;

/**
 * @desc create TaskSchema
 */
const TaskSchema = new Schema({
	text: {
		type: String,
		required: true
	}
}, {
	// add createdAt and updatedAt
	timestamps: true
});

/**
 * @desc create TaskModel
 */
export default mongoose.model('Task', TaskSchema);
