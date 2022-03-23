import React, {ChangeEvent, FormEvent, useState} from 'react';
import {FaUser} from "react-icons/fa";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {register} from "../features/auth/authSlice";
import {RootState} from "../app/store";

const RegisterPage = () => {

	const dispatch = useDispatch();
	const {user, isSuccess, isLoading, message, isError} = useSelector((state: RootState) => state.auth)

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		cpassword: ''
	});

	const {name, email, password, cpassword} = formData;

	// through name='xxx' to different the input
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState, [e.target.name]: e.target.value
		}))
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== cpassword) {
			toast.error('Password does not match')
		}
		else {
			const userData = {
				name, email, password
			};

			dispatch(register(userData))
		}
	}

	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> REGISTER {user}
				</h1>
				<p>Please register one Account</p>
			</section>
			<section className={'form'}>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="text" className="form-control" placeholder={'input the name'}
							name='name' id={'name'} value={name} onChange={handleInputChange}
							required
						/>
					</div>
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
						<input
							type="password" className="form-control" placeholder={'confirm the password'}
							name='cpassword' id={'cpassword'} value={cpassword} onChange={handleInputChange}
							required
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Register</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default RegisterPage;

