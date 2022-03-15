
import mongoose from "mongoose";
import express from "express";
import {getMeController, loginUserController, registerUserController} from '../controllers/userController'

const userRouter = express.Router();

userRouter.post('/register', registerUserController);

userRouter.post('/login', loginUserController);

userRouter.get('/me', getMeController);


export {userRouter}
