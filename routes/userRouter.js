const express = require("express")
const app = express();
const fs = require('fs');
const {json} = require("express");


const userRouter = express.Router();

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Not yet defined"
    })
}
const getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Not yet defined"
    })
}
const updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Not yet defined"
    })
}
const deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Not yet defined"
    })
}
const createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "Not yet defined"
    })
}

userRouter.route('/').get(getAllUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser).post(createUser);

module.exports=userRouter