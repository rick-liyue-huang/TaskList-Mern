import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../app/store";
import TaskForm from '../components/TaskForm';
import Spinner from "../components/Spinner";
import {getAllTasks, reset} from '../features/tasks/tasksSlice'
import TaskItem from "../components/TaskItem";


const DashboardPage: React.FC = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {user} = useSelector((state: RootState) => state.auth);
	const {tasks, isError, isLoading, isSuccess, message} = useSelector((state: RootState) => state.task)

	useEffect(() => {

		if (isError) {
			console.log(message)
		}

		if (!user) {
			navigate('/login')
		}

		dispatch(getAllTasks());

		return () => {
			dispatch(reset())
		}

	}, [user, navigate, isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className={'heading'}>
				<h1>welcome {user && user.name}</h1>
				<p>Task Management</p>
			</section>

			<TaskForm />

			<section className="content">
				{
					(tasks.length > 0 ) ? (
						<div>
							{tasks.map((task) => (
								<TaskItem key={task._id} task={task} />
							))}
						</div>
					) : (<h2>No Tasks</h2>)

				}
			</section>
		</>
	);
};

export default DashboardPage;
