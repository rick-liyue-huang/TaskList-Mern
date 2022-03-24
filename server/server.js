
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const {userRouter} = require("./routes/userRoute");
const {errorHandler} = require("./middlewares/errorHandler");
const {connectDB} = require("./config/connectDB");
const {taskRouter} = require("./routes/taskRoute");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT || 3500;

// connect mongoDB async
connectDB();

// create server by express.js
const app = express();

// let res.json() is working
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

// serve client
if (process.env.NODE_ENV === 'production') {
	// set build directory as static
	app.use(express.static(path.join(__dirname, '../client/build')));

	app.get('*', (_, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'))
	});

} else {
	app.get('/', (req, res) => {
		res.status(200).json({message: 'Set as production to deploy heroku'})
	})
}


// errorHandler deal with the res.json, so put it after routes
app.use(errorHandler);

app.listen(PORT, () => {
	console.info(`this server is listening on port of ${PORT}`)
});
