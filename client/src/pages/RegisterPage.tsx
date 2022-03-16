import React, {ChangeEvent, FormEvent} from 'react';
import {useState, useEffect} from "react";
import {FaUser} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import {register, reset} from "../features/auth/authSlice";
import {RootState} from "../app/store";
import Spinner from '../components/Spinner';

export interface RegisterType {
	name: string;
	email: string;
	password: string;
	cpassword?: string;
}

const RegisterPage: React.FC = () => {

	const [formData, setFormData] = useState<RegisterType>({
		name: '',
		email: '',
		password: '',
		cpassword: ''
	});


	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {user, isError, isLoading, isSuccess, message} = useSelector((state: RootState) => state.auth);

	const {name, email, password, cpassword} = formData;

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// for the confirmed password, we can verify on frontend
		if (password !== cpassword) {
			toast.error('password and confirm password not match')
		} else {
			const userData = {
				name, email, password
			};

			// send action to server
			dispatch(register(userData))
		}
	}

	useEffect(() => {
		if (isError) {
			toast.error(message as string)
		}
		if (isSuccess && user) {
			navigate('/')
		}
		dispatch(reset());

	}, [user, isError, isSuccess, message, navigate, dispatch])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className={'heading'}>
				<h1>
					<FaUser /> REGISTER
				</h1>
				<p>Create an Account</p>
			</section>
			<section className="form">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="text" className="form-control" id={'name'} name={'name'}
							value={name} placeholder={'input name'} onChange={handleOnChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="email" className="form-control" id={'email'} name={'email'}
							value={email} placeholder={'input email'} onChange={handleOnChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password" className="form-control" id={'password'} name={'password'}
							value={password} placeholder={'input password'} onChange={handleOnChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password" className="form-control" id={'cpassword'} name={'cpassword'}
							value={cpassword} placeholder={'confirm password'} onChange={handleOnChange}
						/>
					</div>
					<div className="form-group">
						<button type={'submit'} className={'btn btn-block'}>CREATE</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default RegisterPage;
