
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import taskService from './taskService';
import {RootState} from "../../app/store";


export interface ResponseTaskType {
	title: string;
	description: string
	user: string,
	status: string;
}


export interface TaskType {
	tasks: ResponseTaskType[]
	task: ResponseTaskType | {};
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
}

export interface SingleTaskType {
	title: string;
	description: string;
}

const initialState: TaskType = {
	tasks: [],
	task: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

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
			})
			.addCase(createNewTask.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})
	})
});

export const {reset} = taskSlice.actions;
export default taskSlice.reducer;
