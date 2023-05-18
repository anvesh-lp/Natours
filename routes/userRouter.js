const express = require('express');
const app = express();
const fs = require('fs');
const { json } = require('express');
const authController=require('./../controllers/authentication')
const { getAllUsers, getUser, updateUser, deleteUser, createUser } = require('./../controllers/userController');

const userRouter = express.Router();
userRouter.post('/signup',authController.signUp)
userRouter.route('/').get(getAllUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser).post(createUser);

module.exports = userRouter;