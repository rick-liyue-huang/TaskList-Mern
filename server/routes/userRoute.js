
const express = require('express');
const {registerUserController, loginUserController, getMeController} = require("../controllers/userController");
const {authController} = require("../middlewares/authController");

const userRouter = express.Router();

userRouter.post('/register', registerUserController)

userRouter.post('/login', loginUserController);

// protected router
userRouter.get('/me', authController, getMeController)

module.exports = {userRouter}
