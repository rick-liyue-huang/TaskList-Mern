import React from 'react';
import {FaArrowAltCircleLeft} from "react-icons/fa";
import {Link} from 'react-router-dom';


/**
 * @desc Home button to go back dashboard
 * @param url
 * @constructor
 */
const HomeButton = ({url}: {url: string}) => {
	return (
		<Link to={url} className={'btn btn-reverse btn-back'}>
			DASHBOARD
		</Link>
	);
};

export default HomeButton;
