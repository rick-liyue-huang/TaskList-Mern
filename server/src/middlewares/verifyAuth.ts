
import JWT, {JwtPayload} from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import {UserModel} from "../models/userModel";
import {NextFunction, Request, Response} from "express";



export const verifyAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
		//	 get token from header
			token = req.headers.authorization.split(' ')[1];

		//verify the token
			const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;

			console.log('decoded: ', decoded);

		//	get the user from token
		//	here needs to modify the express type file by @types/express/index.d.ts and set typeRoots in tsconfig.json
		//	here decoded.id must be 'id' to see the jwt.io
			req.user = await UserModel.findById(decoded.id).select('-password');

			console.log('req.user: ', req.user);

			next();

		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error('No Authorized as bad token')
		}
	}

	if (!token) {
		res.status(403);
		throw new Error('no token')
	}
})
