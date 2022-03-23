
import axios from "axios";
import {UserType} from "./authSlice";

const API_URI = '/api/users/';


/**
 * @desc connect with server by axios to post register controller
 * @param userData
 */
const register = async (userData: UserType) => {
	const response = await axios.post(API_URI + 'register', userData);
	console.log('response.data: ', response.data);
	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data;
}

/**
 * @desc connect with server by axios to post login controller
 * @param userData
 */
const login = async (userData: UserType) => {
	const response = await axios.post(API_URI + 'login', userData);
	console.log('response.data: ', response.data);
	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data;
}

/**
 * @desc logout through remove localstorage
 */
const logout = () => localStorage.removeItem('user');

const authService = {
	register, login, logout
}


export default authService;
