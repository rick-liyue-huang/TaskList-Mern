import React, {ChangeEvent, FormEvent} from 'react';
import {useState, useEffect} from "react";
import {FaUser} from "react-icons/fa";

interface RegisterType {
	name: string;
	email: string;
	password: string;
	cpassword: string;
}

const RegisterPage: React.FC = () => {

	const [formData, setFormData] = useState<RegisterType>({
		name: '',
		email: '',
		password: '',
		cpassword: ''
	});

	const {name, email, password, cpassword} = formData;

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
					<FaUser /> REGISTER
				</h1>
				<p>Create an Account</p>
			</section>
			<section className="form">
				<form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
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
