
const express = require('express');
const {registerUserController, loginUserController} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post('/register', registerUserController)

userRouter.post('/login', loginUserController)

module.exports = {userRouter}
