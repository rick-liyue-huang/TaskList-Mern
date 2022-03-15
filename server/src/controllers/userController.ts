import {NextFunction, Request, Response} from "express";
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
export const registerUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

	const {name, email, password} = req.body;

	// validate the input info
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please complete all the form fields')
	}

	// check the user is existed already or not
	const existedUser = await UserModel.findOne({email});

	if (existedUser) {
		res.status(400)
		throw new Error('User already existed');
	}

//	hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

//	create user
	const newUser = await UserModel.create({
		name,
		email,
		password: hashedPassword
	});

	if (newUser) {
		res.status(201).json({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			// after register, create the token for the specified user
			token: generateToken(newUser._id)
		})
	} else {
		res.status(400);
		throw new Error('invalid user')
	}
})


/**
 * @desc Login User
 * @route POST /api/users/login
 * @access public
 *
 */
export const loginUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

	const {email, password} = req.body;

	// check user
	const user = await UserModel.findOne({email});
	if (user && (await bcrypt.compare(password,user.password))) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			// after login, create the token for the specified user
			token: generateToken(user._id)
		});
	} else {
		res.status(400);
		throw new Error('user no registered')
	}
});


/**
 * @desc Get User
 * @route GET /api/users/me
 * @access private
 *
 */
export const getMeController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

	const {_id, name, email} = await UserModel.findById(req.user._id);

	res.status(200).json({
		id: _id,
		name,
		email
	});
});

/**
 * @desc generate the token for authentication and authorization
 * @access private
 * @param id
 */
export const generateToken = (id: string) => {
	return JWT.sign(
		{id},
		process.env.JWT_SECRET_KEY as string,
		{expiresIn: '1d'}
	)
}

