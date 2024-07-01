
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const { BAD_REQUEST } = require("../utils/errorConstants");
const { sendError, errorCreationHandeling, errorHandeling} = require("../utils/errors")
const { JWT_SECRET } = require('../utils/config');



const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then(user => res.send(user))
    .catch(error => errorHandeling(error, res));
};

const createUser = (req, res) => {
    console.log(req.body)
    const { name, avatar, email, password} = req.body;

    if (!name || !avatar || !email || !password) {
      return sendError(BAD_REQUEST,{ message: `Missing required fields: [ ${!name?"name, ":""}${!avatar?"avatar, ":""}${!email?"email, ":""}${!password?"password ":""}]` }, res);
    }

    return  User.findOne({email})
      .then((user)=>{
        if (user) {
          const error = new Error('User with this email already exists');
          error.code = 11000;
          throw error;
        }
        return bcrypt.hash(password, 10);
        })
      .then(hashPassword => User.create({ name, avatar , email, password: hashPassword}))
      .then(user => res.status(201).send(user))
      .catch(error =>errorCreationHandeling(error, res));
}

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  User.findUserByCredentials(email, password)
    .then(user=>{
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((error)=>{
      errorHandeling(error, res, true)
    })
}

const updateCurrentUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true, context: 'query' }
  )
    .orFail()
    .then(user => res.send(user))
    .catch(error => errorHandeling(error, res));
};

module.exports = { createUser, login, getCurrentUser, updateCurrentUser};