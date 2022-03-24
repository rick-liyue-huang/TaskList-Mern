
const JWT = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const {userModel} = require('../models/userModel');

/**
 * @desc confirm the user can execute the task controller after get token
 * @type {*|express.RequestHandler<core.ParamsDictionary, any, any, core.Query>}
 */
const authController = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
		//	 get token from req headers
			token = req.headers.authorization.split(' ')[1];
		//	 verify token
			const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

			// get user info from token
			req.user = await userModel.findById(decoded.id).select('-password');
			next();
		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error('not authorized');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('no token');
	}
});

module.exports = {authController}
