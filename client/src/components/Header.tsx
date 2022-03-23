import React from 'react';
import {FaSignInAlt, FaUser} from "react-icons/fa";
import {Link} from 'react-router-dom';

const HeaderComponent = () => {
	return (
		<header className={'header'}>
			<div className="logo">
				<Link to={'/'}>HOME</Link>
			</div>
			<ul>
				<li>
					<Link to={'/login'}>
						<FaSignInAlt /> LOGIN
					</Link>
				</li>
				<li>
					<Link to={'/register'}>
						<FaUser /> REGISTER
					</Link>
				</li>
			</ul>
		</header>
	);
};

export default HeaderComponent;
