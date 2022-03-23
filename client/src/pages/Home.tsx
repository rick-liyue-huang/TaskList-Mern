import React from 'react';
import {Link} from 'react-router-dom';
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'

const HomePage = () => {
	return (
		<>
			<section className={'heading'}>
				<h1>Get the task list</h1>
				<p>Please choose below</p>
			</section>
			<Link to={'/new-ticket'} className={'btn btn-reverse btn-block'}>
				<FaQuestionCircle /> Create New Task
			</Link>
			<Link to={'/tickets'} className={'btn btn-block'}>
				<FaTicketAlt /> View Task List
			</Link>
		</>
	);
};

export default HomePage;
