import React, {FormEvent, useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {showSingleTask, completeSingleTask, showAllTasks} from "../features/tasks/taskSlice";
import HomeButton from "../components/HomeButton";
import SpinnerComponent from "../components/Spinner";
import {RootState} from "../app/store";
import {toast} from "react-toastify";
import {showNotes, reset as noteReset, createNote} from "../features/notes/noteSlice";
import NoteItem from '../components/NoteItem';
import Modal, {Styles} from 'react-modal';
import {FaPlus} from "react-icons/fa";


const customStyles: Styles = {
	content: {
		width: '600px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		position: 'relative'

	},
}
Modal.setAppElement('#root')

const TaskShowPage = () => {

	const [modalOpen, setModalOpen] = useState(false);
	const [noteText, setNoteText] = useState('');

	const {task, isError, isLoading, message} = useSelector((state: RootState) => state.task);

	const {notes, isLoading: isNoteLoading} = useSelector((state: RootState) => state.note)

	const dispatch = useDispatch();
	const navigate = useNavigate();


	const {taskId} = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		dispatch(showSingleTask(taskId!));
		dispatch(showNotes(taskId!))

	//	 eslint-disable-next-line
	}, [isError, message, taskId])

	if (isLoading || isNoteLoading) {
		return <SpinnerComponent />
	}

	if (isError) {
		return <h3>No Task Show Here...</h3>
	}

	const handleComplete = () => {
		dispatch(completeSingleTask(taskId!))
		toast.success('Task completed');
		navigate('/')
	}

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const handleNoteFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createNote({noteText, taskId}))
		setNoteText('');
		handleCloseModal();
	}

	return (
		<div className={'ticket-page'}>
			<header className="ticket-header">
				<HomeButton url={'/tasks'} />
				<h2>
					Task ID: {task && task._id}
					<span className={`status status-${task.status}`}>
						{task.status}
					</span>
				</h2>
				<h3>Submission Date: {new Date(task.createdAt as string).toLocaleDateString('en-AU')}</h3>
				<h3>Title: {task.title}</h3>
				<div className="ticket-desc">
					<h3>Description</h3>
					<p>{task.description}</p>
				</div>
				<h2>Notes</h2>
			</header>

			{
				task.status !== 'completed' && (
					<button onClick={handleOpenModal} className={'btn'}><FaPlus /> Add Note</button>
				)
			}

			<Modal
				isOpen={modalOpen} onRequestClose={handleCloseModal} style={customStyles}
				contentLabel={'ADD NOTE'}
			>
				<h2>ADD NOTE</h2>
				<button className={'btn-close'} onClick={handleCloseModal}>Close</button>

				<form onSubmit={handleNoteFormSubmit}>
					<div className="form-group">
						<textarea
							name="noteText" id="noteText" className={'form-control'}
							placeholder={'note text'} value={noteText}
							onChange={(e) => setNoteText(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<button className={'btn'} type={'submit'} >Create Note</button>
					</div>
				</form>
			</Modal>

			{
				notes.map(note => (
					<NoteItem key={note._id} note={note} />
				))
			}

			{
				task.status !== 'completed' && (
					<button
						className={'btn btn-block btn-danger'}
						onClick={handleComplete}
					>Complete Task</button>
				)
			}
		</div>
	);
};

export default TaskShowPage;
