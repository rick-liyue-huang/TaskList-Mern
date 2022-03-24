
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import taskService from './taskService';
import {RootState} from "../../app/store";


export interface ResponseTaskType {
	_id?: string;
	createdAt?: string
	title: string;
	description: string
	user: string,
	status: string;
}


export interface TaskStateType {
	tasks: ResponseTaskType[]
	task: ResponseTaskType | Record<string, any>;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
}

export interface SingleTaskType {
	title: string;
	description: string;
}

const initialState: TaskStateType = {
	tasks: [],
	task: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

/**
 * @desc connect with task page by execute service function
 */
export const createNewTask = createAsyncThunk(
	'tasks/create',
	async (taskData: SingleTaskType, thunkApi) => {

		try {

			// @ts-ignore
			const token = (thunkApi.getState() as RootState).auth.user.token;

			return await taskService.createNewTask(taskData, token)
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message)
				|| err.message ||
				err.toString() as string;

			return thunkApi.rejectWithValue(message);
		}
	}
)

export const showAllTasks = createAsyncThunk(
	'tasks/getAll',
	async (_, thunkApi) => {

		try {

			// @ts-ignore
			const token = (thunkApi.getState() as RootState).auth.user.token;

			return await taskService.showAllTasks(token)
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message)
				|| err.message ||
				err.toString() as string;

			return thunkApi.rejectWithValue(message);
		}
	}
)

export const showSingleTask = createAsyncThunk(
	'tasks/get',
	async (taskId: string, thunkApi) => {

		try {

			// @ts-ignore
			const token = (thunkApi.getState() as RootState).auth.user.token;

			return await taskService.showSingleTask(taskId, token)
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message)
				|| err.message ||
				err.toString() as string;

			return thunkApi.rejectWithValue(message);
		}
	}
)



export const completeSingleTask = createAsyncThunk(
	'tasks/complete',
	async (taskId: string, thunkApi) => {

		try {

			// @ts-ignore
			const token = (thunkApi.getState() as RootState).auth.user.token;

			return await taskService.completeSingleTask(taskId, token)
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message)
				|| err.message ||
				err.toString() as string;

			return thunkApi.rejectWithValue(message);
		}
	}
)


export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builder => {
		builder
			.addCase(createNewTask.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createNewTask.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.task = action.payload;
			})
			.addCase(createNewTask.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})
			.addCase(showAllTasks.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(showAllTasks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tasks = action.payload
			})
			.addCase(showAllTasks.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})
			.addCase(showSingleTask.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(showSingleTask.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// TODO:
				state.task = action.payload
			})
			.addCase(showSingleTask.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})
			.addCase(completeSingleTask.fulfilled, (state, action) => {
				state.isLoading = false;
				state.tasks.map(task => task._id === action.payload._id ? (task.status = 'done') : task);
			})
	})
});

export const {reset} = taskSlice.actions;
export default taskSlice.reducer;
