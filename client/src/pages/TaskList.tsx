
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {showAllTasks, reset} from "../features/tasks/taskSlice";
import SpinnerComponent from "../components/Spinner";
import HomeButton from "../components/HomeButton";
import {RootState} from "../app/store";
import TaskItem from "../components/TaskItem";
import {toast} from "react-toastify";


/**
 * @desc task list page
 * @constructor
 */
const TaskListPage = () => {

	const {tasks, isSuccess, isLoading, message, isError} = useSelector((state: RootState) => state.task);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset())
			}
		}
	}, [dispatch, isSuccess])

	useEffect(() => {
		dispatch(showAllTasks())
	}, [dispatch]);

	if (isLoading) return <SpinnerComponent />

	if (isError) {
		toast.error(message)
	}

	return (
		<div>
			<HomeButton url={'/'} />
			<h1>TASK LIST</h1>
			<div className="task-headings">
				<div>Date</div>
				<div>Title</div>
				<div>Status</div>
			</div>
			{
				tasks.map(task => (
					<TaskItem key={task._id} task={task} />
				))
			}
		</div>
	);
};

export default TaskListPage;
