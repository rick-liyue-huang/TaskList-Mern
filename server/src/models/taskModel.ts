
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;


const {Schema} = mongoose;


/**
 * @desc create TaskSchema
 */
const TaskSchema = new Schema({
	// _id: {
	// 	type: String,
	// 	default: function () {
	// 		return new ObjectId().toString()
	// 	}
	// },
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


// TaskSchema.add(UniqueObjectId);

/**
 * @desc create TaskModel
 */
export const TaskModel = mongoose.model('Task', TaskSchema);
