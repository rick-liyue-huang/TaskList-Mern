
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import taskService from './tasksService';


export interface TaskType {
	tasks: Record<string, any>[];
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: unknown;
}

const initialState: TaskType = {
	tasks: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

// create task
export const createTask = createAsyncThunk(
	'tasks/create',
	async (taskData: Record<string, any>, thunkApi: Record<string, any>
) => {
	try {

		const token = thunkApi.getState().auth.user.token;
		return await taskService.createTask(taskData, token);

	} catch (err) {
		const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

		return thunkApi.rejectWithValue(message)
	}
});

export const getAllTasks = createAsyncThunk(
	'tasks/getAll',
	async (_, thunkApi: Record<string, any>
) => {
	try {

		const token = thunkApi.getState().auth.user.token;
		return await taskService.getAllTasks(token);

	} catch (err) {
		const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

		return thunkApi.rejectWithValue(message)
	}
});

// delete task
export const deleteTask = createAsyncThunk(
	'tasks/delete',
	async (id: string, thunkApi: Record<string, any>) => {
		try {
			const token = thunkApi.getState().auth.user.token;
			return await taskService.deleteTask(id, token);

		} catch (err) {
			const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

			return thunkApi.rejectWithValue(message)
		}
	}
);
//
// export const editTask = createAsyncThunk(
// 	'tasks/edit',
// 	async (taskData: Record<string, any>, id: string, thunkApi: Record<string, any>) => {
// 		try {
// 			const token = thunkApi.getState().auth.user.token;
// 			return await taskService.editTask(id, taskData, token);
//
// 		} catch (err) {
// 			const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
//
// 			return thunkApi.rejectWithValue(message)
// 		}
// 	}
// )

export const tasksSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		reset: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTask.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tasks.push(action.payload);
			})
			.addCase(createTask.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload
			})
			.addCase(getAllTasks.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllTasks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tasks = action.payload;
			})
			.addCase(getAllTasks.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteTask.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tasks = state.tasks.filter(t => t._id !== action.payload.id)
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			// .addCase(editTask.pending, (state) => {
			// 	state.isLoading = true;
			// })
			// .addCase(editTask.fulfilled, (state, action) => {
			// 	state.isLoading = false;
			// 	state.isSuccess = true;
			// 	state.tasks = [...state.tasks, ]
			// })
			// .addCase(editTask.rejected, (state, action) => {
			// 	state.isLoading = false;
			// 	state.isError = true;
			// 	state.message = action.payload;
			// })
	}
})


export const {reset} = tasksSlice.actions;
export default tasksSlice.reducer;
