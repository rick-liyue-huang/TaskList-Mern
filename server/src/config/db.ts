
import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URL as string);

		console.log(`MongoDB is connected on: ${conn.connection.host}`)
	} catch (err) {
		console.log(err);
		process.exit(1)
	}
}


