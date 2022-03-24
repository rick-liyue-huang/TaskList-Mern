import React, {ChangeEvent, FormEvent, useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../app/store";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import SpinnerComponent from "../components/Spinner";
import {createNewTask, reset} from "../features/tasks/taskSlice";
import HomeButton from '../components/HomeButton';

/**
 * @desc create task page
 * @constructor
 */
const NewTaskPage = () => {

	const {user} = useSelector((state: RootState) => state.auth);
	const {isLoading, isError, isSuccess, message, task} = useSelector((state: RootState) => state.task);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [name] = useState(user?.name);
	const [email] = useState(user?.email);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createNewTask({
			title, description
		}))
	}

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess) {
			dispatch(reset());
			navigate('/tasks')
		}
		dispatch(reset())
	}, [dispatch, isError, isSuccess, navigate, message])


	if (isLoading) return <SpinnerComponent />
	return (
		<>
			<HomeButton url={'/'} />
			<section className={'heading'}>
				<h1>CREATE NEW TASK</h1>
				<p>Please create the task</p>
			</section>

			<section className={'form'}>
				<div className="form-group">
					<label htmlFor="name">User Name</label>
					<input
						type="text" className="form-control"
						value={name} disabled id={'name'}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">User Email</label>
					<input
						type="text" className="form-control"
						value={email} disabled id={'email'}
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<div className={'form-group'}>
						<label htmlFor="title">Title</label>
						<input className={'form-control'}
							type="text" id={'title'} placeholder={'Please input title'} name={'title'}
							value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
						/>
					</div>
					<div className={'form-group'}>
						<label htmlFor="description">Description</label>
						<textarea className={'form-control'}
							id={'description'} placeholder={'talk more about it'} name={'description'}
							value={description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<button className={'btn btn-block'}>CREATE</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default NewTaskPage;
