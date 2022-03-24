import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";
import {RootState} from "../app/store";
import {FaHome} from "react-icons/fa";


/**
 * @desc header component
 * @constructor
 */
const HeaderComponent = () => {

	const {user} = useSelector((state: RootState) => state.auth)
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/')
	}

	return (
		<header className={'header'}>
			<div className="logo">
				<Link to={'/'} style={{fontWeight: 'bolder', fontSize: '1.6rem'}}><FaHome /></Link>
			</div>
			<ul>
				{
					user ? (
						<li>
							<button className={'btn'} onClick={handleLogout}>
								<FaSignOutAlt /> LOGOUT
							</button>
						</li>
					) : (
						<>
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
						</>

					)
				}

			</ul>
		</header>
	);
};

export default HeaderComponent;
