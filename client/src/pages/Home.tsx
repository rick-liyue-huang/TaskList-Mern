import React from 'react';
import {Link} from 'react-router-dom';
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'

const HomePage = () => {
	return (
		<>
			<section className={'heading'}>
				<h1 style={{color: 'steelblue'}}>TASK DASHBOARD</h1>
				<p>Please choose below</p>
			</section>
			<Link to={'/newtask'} className={'btn btn-reverse btn-block'}>
				<FaQuestionCircle /> <span style={{color: 'steelblue'}}>CREATE TASK</span>
			</Link>
			<Link to={'/tasks'} className={'btn btn-block'}>
				<FaTicketAlt />  SHOW TASK
			</Link>
		</>
	);
};

export default HomePage;
