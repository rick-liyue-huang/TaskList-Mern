
import {Request, Response, NextFunction} from "express";

// this is one middleware, so need next whatever next is used or not.
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

	const statusCode = res.statusCode ? res.statusCode : 500;

	res.status(statusCode);

	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? 'null' : err.stack,
	})
};
