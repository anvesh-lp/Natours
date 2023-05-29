const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const apperror = require('./../utils/AppError');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TIMEOUT
  });
};

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      err
    });
  }

};
exports.login = async (req, res, next) => {
  try {


    const { email, password } = req.body;

    if (!email || !password) {
      return next(new apperror('please rpvide email and password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new apperror('Incorrect email or password', 401));
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (err) {
    return next(new apperror(err, 401));
  }
};