const express = require("express")
const app = express();
const fs = require('fs');
const {json} = require("express");
const {getAllUsers, getUser, updateUser, deleteUser, createUser} = require('./../controllers/userController')

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser).post(createUser);

module.exports = userRouter