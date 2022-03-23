
const asyncHandler = require('express-async-handler')

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
})

/**
 * @desc login user controller
 * @route /api/users/login
 * @param req
 * @param res
 */
const loginUserController = asyncHandler(async (req, res) => {
	res.send('login user')
})

module.exports = {registerUserController, loginUserController}
