const mongoose = require('mongoose');
const validator = require('validator');
const stream = require('stream');
const bycrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell your name']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function(el) {
        return el === this.password;
      }
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bycrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();

});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bycrypt.compare(candidatePassword, userPassword);
};


const User = mongoose.model('User', userSchema);

module.exports = User;