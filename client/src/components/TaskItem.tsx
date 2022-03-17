
import {useDispatch} from "react-redux";
import { deleteTask/*, editTask*/ } from '../features/tasks/tasksSlice';

const TaskItem = ({ task }: {task: Record<string, any>}) => {

	const dispatch = useDispatch();

	return (
		<div className='task'>
			<div>{new Date(task.createdAt).toLocaleString('en-US')}</div>
			<h2>{task.text}</h2>
			<div style={{display: "flex"}}>
				<button style={{marginRight: '.5rem'}} onClick={() => dispatch(deleteTask(task._id))}>DELETE</button>
				{/*<button onClick={() => dispatch(editTask(task._id))}>EDIT</button>*/}
			</div>

		</div>
	)
}

export default TaskItem
