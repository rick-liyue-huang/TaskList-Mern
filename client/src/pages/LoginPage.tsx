import React, {ChangeEvent, FormEvent, useState} from 'react';
import {FaSignInAlt} from "react-icons/fa";

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

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
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
				<form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
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
