import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {logout, reset} from "../features/auth/authSlice";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../app/store";
import LoginPage from "../pages/LoginPage";

const Header = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {user} = useSelector((state: RootState) => state.auth);

	console.log('user: ', user);

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	}
	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>TASK MANAGEMENT</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button className='btn' onClick={handleLogout}>
							<FaSignOutAlt /> LOGOUT
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to='/login'>
								<FaSignInAlt /> LOGIN
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<FaUser /> REGISTER
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
};

export default Header;