
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const {userRouter} = require("./routes/userRoute");
const {errorHandler} = require("./middlewares/errorHandler");
const {connectDB} = require("./config/connectDB");

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

// errorHandler deal with the res.json, so put it after routes
app.use(errorHandler);

app.listen(PORT, () => {
	console.info(`this server is listening on port of ${PORT}`)
});
