import React, {ChangeEvent, FormEvent, useState} from 'react';
import {toast} from "react-toastify";
import {FaSignInAlt} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {login} from "../features/auth/authSlice";
import {RootState} from "../app/store";
import {log} from "util";


const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const {} = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const {email, password} = formData;

	// through name='xxx' to different the input
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState, [e.target.name]: e.target.value
		}))
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userData = {
			email, password
		};

		dispatch(login(userData))
	}

	return (
		<>
			<section className="heading">
				<h1>
					<FaSignInAlt /> LOGIN
				</h1>
				<p>Please login one Account</p>
			</section>
			<section className={'form'}>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="email" className="form-control" placeholder={'input the email'}
							name='email' id={'email'} value={email} onChange={handleInputChange}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="password" className="form-control" placeholder={'input the password'}
							name='password' id={'password'} value={password} onChange={handleInputChange}
							required
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Login</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default LoginPage;
