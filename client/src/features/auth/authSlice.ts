
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from './authService';


export interface UserType {
	name?: string;
	email: string;
	password: string;
	cpassword?: string;
}

export interface ResponseUserType {
	_id: string,
	name: string,
	email: string,
	token: string
}

export interface AuthType {
	user: ResponseUserType | null;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
}

const user = JSON.parse(localStorage.getItem('user') as string) as ResponseUserType;

const initialState: AuthType= {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
};

/**
 * @desc register user
 */
export const register = createAsyncThunk(
	'auth/register',
	async (user: UserType, thunkApi) => {
	console.log('register---user: ', user);

	try {
		return await authService.register(user)
	} catch (err) {
		const message =
			(err.response && err.response.data && err.response.data.message)
			|| err.message ||
			err.toString() as string;

		return thunkApi.rejectWithValue(message);
	}

});

/**
 * @desc login user
 */
export const login = createAsyncThunk(
	'auth/login',
	async (user: UserType, thunkApi) => {
	console.log(user);
});


/**
 * @desc deal with auth redux stuff
 */
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
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.user = null;
				state.message = action.payload as string;
			})
	}
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;
