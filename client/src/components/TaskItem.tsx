import React from 'react';
import {Link} from 'react-router-dom';
import {ResponseTaskType} from "../features/tasks/taskSlice";

/**
 * @desc dump component
 * @param task
 * @constructor
 */
const TaskItem = ({task}: {task: ResponseTaskType}) => {
	return (
		<div className={'task'}>
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
