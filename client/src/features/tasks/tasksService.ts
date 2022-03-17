
import axios from "axios";

const API_URL = '/api/tasks/';

// create new task
const createTask = async (taskData: Record<string, any>, token: string) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.post(API_URL, taskData, config);

	return response.data;
};

// get all tasks
const getAllTasks = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URL, config);

	return response.data;
}

// delete task
const deleteTask = async (taskId: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	console.log('taskId:------ ', taskId);

	const response = await axios.delete(API_URL + taskId, config);

	console.log('response: ', response)

	return response.data;
}

/*
const editTask = async (taskId: string, taskData: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.put(API_URL + taskId, taskData, config);

	console.log('response: ', response);
	return response.data;
}
*/


const taskService = {
	createTask,
	getAllTasks,
	deleteTask,
	// editTask
}

export default taskService;
