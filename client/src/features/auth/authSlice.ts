
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from "./authService";
import {RegisterType} from "../../pages/RegisterPage";

// get user from localstorage
const user = JSON.parse(localStorage.getItem('user') || '{}');

interface AuthType {
	user: Record<string, any> | null;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: unknown;
}

// register user
// because this asyncThunk so has different state
export const register = createAsyncThunk('auth/register', async (user: RegisterType, thunkApi) => {
		try {
			return await authService.register(user)
		} catch (err) {
			const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

			return thunkApi.rejectWithValue(message)
		}
});

// login user
// because this asyncThunk so has different state
export const login = createAsyncThunk('auth/login', async (user: RegisterType, thunkApi) => {
	try {
		return await authService.login(user)
	} catch (err) {
		const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

		return thunkApi.rejectWithValue(message)
	}
});

export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout()
})

const initialState: AuthType = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = ''
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload // match response.data from authService.register
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload; // match thunkApi.rejectWithValue(message)
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload // match response.data from authService.register
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload; // match thunkApi.rejectWithValue(message)
				state.user = null;
			})
	}
});

export const {reset} = authSlice.actions;
export default authSlice.reducer



