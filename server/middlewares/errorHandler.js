/**
 * @desc handle the errors from routes, but here need next property as middleware
 * @param err
 * @param req
 * @param res
 * @param next
 */
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode ? res.statusCode : 500;

	res.status(statusCode);
	res.json({
		message: err.message,
		// stack: process.env.NODE_ENV === 'production' && err.stack,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack
	});

}

module.exports = {errorHandler}
