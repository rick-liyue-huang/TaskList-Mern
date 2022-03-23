
import axios from "axios";
import {UserType} from "./authSlice";

const API_URI = '/api/users/register';

const register = async (userData: UserType) => {
	const response = await axios.post(API_URI, userData);
	console.log('response.data: ', response.data);
	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data;
}

const authService = {
	register
}


export default authService;
