
import axios from "axios";
import {SingleTaskType} from "./taskSlice";

const API_URI = '/api/tasks/';


/**
 * @desc create new task after login or register
 * @param task
 * @param token
 */
const createNewTask = async (task: SingleTaskType, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.post(API_URI, task, config);

	return response.data;
}

/**
 * @desc show all tasks by token
 * @param token
 */
const showAllTasks = async (token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URI, config);

	return response.data;
};

/**
 * @desc show the single task by id and token
 * @param id
 * @param token
 */
const showSingleTask = async (id: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URI + id, config);

	return response.data;
}

/**
 * @desc close task by id and token
 * @param id
 * @param token
 */
const completeSingleTask = async (id: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.put(API_URI + id, {status: 'completed'}, config);

	return response.data;
}

const taskService = {
	createNewTask,
	showAllTasks,
	showSingleTask,
	completeSingleTask
}


export default taskService;
