
import axios from "axios";

const API_URI = '/api/tasks/'

const showNotes = async (id: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.get(API_URI + id + '/notes', config);

	return response.data;
}

/**
 * @desc connect with server on noteController
 * @param text
 * @param id
 * @param token
 */
const createNote = async (text: string, id: string, token: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};

	const response = await axios.post(API_URI + id + '/notes', {
		text
	}, config);

	return response.data;
}

const noteService = {
	showNotes, createNote
}

export default noteService
