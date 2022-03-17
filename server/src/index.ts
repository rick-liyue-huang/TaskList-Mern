
import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import {taskRouter} from './routes/taskRouter';
import {errorHandler} from './middlewares/errorHandler';
// import {connectDB} from "./config/db";
import mongoose from "mongoose";
import {userRouter} from "./routes/userRouter";
import cors from 'cors'
import path from 'path';

// app will recognize the process.env.xxx variables
dotenv.config();

// connectDB()

mongoose
	.connect(process.env.MONGODB_URL as string)
	.then(() => {

		console.log('MongoDB is connected ', mongoose.connection.host);

		const app = express();
		const PORT = process.env.PORT || 3500;

		app.use(cors()); // if add 'proxy' on client package.json, will not need cors
		app.use(express.json());
		// support the x-www-form-urlencoded
		app.use(express.urlencoded({extended: false}))

		app.use('/api/tasks', taskRouter);
		app.use('/api/users', userRouter);

		// serve client
		if (process.env.NODE_ENV === 'production') {
			app.use(express.static(path.join(__dirname, '..', '..', 'client/build')));

			app.get('*', (req: Request, res: Response) => res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html')));

		} else {
			app.get('/', (req: Request, res: Response) => res.send('Please set NODE_ENV=production'))
		}

		app.use(errorHandler);

		app.listen(PORT, () => {
			console.log(`the server is running on port of ${PORT}`);
		});

	}
)
	.catch(err => {
		console.log(err);
	}
)

