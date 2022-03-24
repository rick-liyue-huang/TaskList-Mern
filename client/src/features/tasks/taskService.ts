
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

const taskService = {
	createNewTask
}


export default taskService;
