import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../app/store";
import {ResponseNoteType} from "../features/notes/noteSlice";



const NoteItem = ({note}: {note: ResponseNoteType}) => {

	const {user} = useSelector((state: RootState) => state.auth);

	return (
		<div className={'note'} style={{
			backgroundColor: note.isManager ? 'rgba(0,0,0,.7)' : 'white',
			color: note.isManager ? '#fff' : '#000'
		}}>
			<h4>Note from {note.isManager ? <span>Manager</span> : <span>{user?.name}</span>}</h4>
			<p>{note.text}</p>
			<div className="note-date">
				{new Date(note.createdAt as string).toLocaleDateString('en-AU')}
			</div>
		</div>
	);
};

export default NoteItem;
