import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {FaSignInAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {toast} from "react-toastify";
import {login, register, reset} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

interface LoginType {
	email: string;
	password: string;
}

const LoginPage: React.FC = () => {

	const [formData, setFormData] = useState<LoginType>({
		email: '',
		password: ''
	});

	const {email, password} = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {user, isError, isLoading, isSuccess, message} = useSelector((state: RootState) => state.auth);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userData = {
			email, password
		}

		dispatch(login(userData))

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
					<FaSignInAlt /> LOGIN
				</h1>
				<p>Login an Account</p>
			</section>
			<section className="form">
				<form onSubmit={handleSubmit}>
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
						<button type={'submit'} className={'btn btn-block'}>ENTER</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default LoginPage;
