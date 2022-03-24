import React from 'react';
import {FaArrowAltCircleLeft} from "react-icons/fa";
import {Link} from 'react-router-dom';

const HomeButton = ({url}: {url: string}) => {
	return (
		<Link to={url} className={'btn btn-reverse btn-back'}>
			DASHBOARD
		</Link>
	);
};

export default HomeButton;
