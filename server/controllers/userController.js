
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {userModel} = require("../models/userModel");



/**
 * @desc register new user controller
 * @route /api/users/register
 * @param req
 * @param res
 */
const registerUserController = asyncHandler(async (req, res) => {
	const {name, email, password} = req.body;

	// validation
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('please fill in all the fields')
	}

//	 find the existed user
	const existsUser = await userModel.findOne(({email}));
	if (existsUser) {
		res.status(400);
		throw new Error('the register user already exist')
	}

//	hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

//	create user
	const newUser = await userModel.create({
		name, email, password: hashedPassword
	});

	if (newUser) {
		res.status(201).json({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email
		});
	}
	else {
		res.status(400)
		throw new Error('no new user created')
	}

})

/**
 * @desc login user controller
 * @route /api/users/login
 * @param req
 * @param res
 */
const loginUserController = asyncHandler(async (req, res) => {

	const {email, password} = req.body;

	const user = await userModel.findOne({email});

	// check user and password
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email
		});
	}
	else {
		res.status(401);
		throw new Error('Invalid email or password')
	}
})

module.exports = {registerUserController, loginUserController}
