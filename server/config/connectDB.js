
const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URL);
		console.log(`mongodb is connected with ${conn.connection.host}`.rainbow.underline);
	} catch (err) {
		console.log(`Error: ${err.message}`.red.underline.bold);
		process.exit(1);
	}
}

module.exports = {connectDB}
