
import axios from "axios";

// match with the http://localhost:3500/api/users/register
// concat "proxy": "http://localhost:3500" in package.json
const API_URL = '/api/users/';

// register user, used to connect with server
const register = async (userData: Record<string, any>) => {
	const response = await axios.post(API_URL + 'register', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
}

// login user
const login = async (userData: Record<string, any>) => {
	const response = await axios.post(API_URL + 'login', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
}

// logout user
const logout = () => {
	localStorage.removeItem('user');
}

const authService = {
	register, login, logout
}

export default authService;