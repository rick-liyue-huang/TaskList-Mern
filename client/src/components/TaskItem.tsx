import React from 'react';
import {Link} from 'react-router-dom';
import {ResponseTaskType} from "../features/tasks/taskSlice";


const TaskItem = ({task}: {task: ResponseTaskType}) => {
	return (
		<div className={'ticket'}>
			<div>
				{
					new Date(task.createdAt as string).toLocaleString('en-AU')
				}
			</div>
			<div>{task.title}</div>
			<div className={`status status-${task.status}`}>
				{task.status}
			</div>
			<Link className={'btn btn-reverse btn-sm'} to={`/tasks/${task._id}`}>CHECK</Link>
		</div>
	);
};

export default TaskItem;