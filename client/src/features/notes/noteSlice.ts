
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import noteService from "./noteService";

export interface NoteType {
	text: string;
	isManager?: boolean;
}

export interface ResponseNoteType {
	_id?:string;
	user?: string;
	task?: string;
	text: string;
	isManager: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface NoteStateType {
	notes: ResponseNoteType[],
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
}

const initialState: NoteStateType = {
	notes: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// get task notes
export const showNotes = createAsyncThunk(
	'notes/getAll',
	async (taskId: string, thunkApi) => {

		try {

			// @ts-ignore
			const token = (thunkApi.getState() as RootState).auth.user.token;

			return await noteService.showNotes(taskId, token)
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message)
				|| err.message ||
				err.toString() as string;

			return thunkApi.rejectWithValue(message);
		}
	}
)

export const createNote = createAsyncThunk(
	'notes/create',
	async ({noteText, taskId}: {noteText: string, taskId: string | undefined}, thunkApi) => {

		try {

			// @ts-ignore
			const token = (thunkApi.getState() as RootState).auth.user.token;

			return await noteService.createNote(noteText,taskId!, token)
		} catch (err) {
			const message =
				(err.response && err.response.data && err.response.data.message)
				|| err.message ||
				err.toString() as string;

			return thunkApi.rejectWithValue(message);
		}
	}
)

export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		reset: (state) => initialState
	},
	extraReducers: (builider) => {
		builider
			.addCase(showNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(showNotes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// TODO:
				state.notes = action.payload
			})
			.addCase(showNotes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})
			.addCase(createNote.pending, (state) => {
			state.isLoading = true;
		})
			.addCase(createNote.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				// TODO:
				state.notes.push(action.payload);
			})
			.addCase(createNote.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})
	}
})


export const {reset} = noteSlice.actions;
export default noteSlice.reducer
