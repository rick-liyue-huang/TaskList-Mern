
import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import taskRouter from './routes/taskRoute';
import {errorHandler} from './middlewares/errorHandler';

// app will recognize the process.env.xxx variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/tasks', taskRouter);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`the server is running on port of ${PORT}`);
})
