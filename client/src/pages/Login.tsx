import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {FaSignInAlt} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {login, UserType, reset} from "../features/auth/authSlice";
import {RootState} from "../app/store";
import {useNavigate} from "react-router-dom";
import SpinnerComponent from "../components/Spinner";



const LoginPage = () => {
	const [formData, setFormData] = useState<UserType>({
		email: '',
		password: '',
	});

	const {user, isSuccess, isLoading, message, isError} = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {email, password} = formData;

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate('/')
		}

		dispatch(reset())
	}, [isError, isSuccess, user, message, navigate, dispatch]);


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

	if (isLoading) return <SpinnerComponent />

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
