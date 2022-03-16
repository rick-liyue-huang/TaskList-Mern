import {Request, Response} from "express";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import {UserModel} from "../models/userModel";


/**
 * @desc Register User
 * @route POST /api/users/register
 * @access public
 *
 */
export const registerUserController = asyncHandler(async (req: Request, res: Response) => {

	const {name, email, password} = req.body;

	// check the form fields validation
	if (!name || !email || !password) {
		res.status(400)
		throw new Error('please fill all form fields')
	}

	// if user already registered
	const existedUser = await UserModel.findOne({email});
	if (existedUser) {
		res.status(400)
		throw new Error('duplicated user')
	}

	// crypt password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// create user
	const newUser = await UserModel.create({
		name,
		email,
		password: hashedPassword
	});

	console.log('newUser: ', newUser);

	if (newUser) {
		res.status(201).json({
			_id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			token: generateToken(newUser.id)
		})
	} else {
		res.status(400);
		throw new Error('invalid user info');
	}

});


/**
 * @desc Login User
 * @route POST /api/users/login
 * @access public
 *
 */
export const loginUserController = asyncHandler(async (req: Request, res: Response) => {

	const {email, password} = req.body;

	// check user is existed
	const user = await UserModel.findOne({email});

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id)
		});
	} else {
		res.status(400);
		throw new Error('Invalid Credentials')
	}
});


/**
 * @desc Get User
 * @route GET /api/users/me
 * @access private
 *
 */
export const getMeController = asyncHandler(async (req: Request, res: Response) => {

	// const {id, name, email} = await UserModel.findById(req.user.id);
	const {_id, name, email} = await UserModel.findById(req.user._id);
	res.status(200).json({
		id: _id,
		name,
		email
	})
});




/**
 * @desc generate the token for authentication and authorization
 * @access private
 * @param id
 */
export const generateToken = (id: any) => {
	return JWT.sign(
		{ id },
		process.env.JWT_SECRET_KEY as string,
		{
			expiresIn: '1d'
		}
	)
}
