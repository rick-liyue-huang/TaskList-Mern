import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {logout, reset} from "../features/auth/authSlice";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../app/store";

const Header = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {user} = useSelector((state: RootState) => state.auth);

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());

	}
	return (
		<header className={'header'}>
			<div className="logo">
				<Link to={'/'}>Task Dashboard</Link>
			</div>
			<ul>
				{
					user ? (
						<ul>
							<li>
								<Link onClick={handleLogout} to={'/'}>
									<FaUser /> LOGOUT
								</Link>
							</li>
						</ul>
					) : (
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
					)
				}
			</ul>
		</header>
	);
};

export default Header;
