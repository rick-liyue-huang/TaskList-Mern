
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {createTask} from '../features/tasks/tasksSlice';


const TaskForm = () => {

	const [text, setText] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(createTask({text}));
		setText('');
	}

	return (
		<section className={'form'}>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="text" >Task</label>
					<input
						type="text" id={'text'}
						name={'text'} value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<button className={'btn btn-block'} type={'submit'}>ADD TASK</button>
				</div>
			</form>
		</section>
	);
};

export default TaskForm;
