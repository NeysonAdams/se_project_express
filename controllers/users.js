const User = require('../models/users');
const { DEFAULT, UNATHORIZED, BAD_REQUEST } = require("../utils/errorConstants");
const { sendError, errorCreationHandeling, errorHandeling} = require("../utils/errors")
const { JWT_SECRET } = require('../utils/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/*const getUsers = (req, res)=>{
  console.log("Get Users");
  User.find()
    .then((users)=>res.send(users))
    .catch(error => sendError(DEFAULT, error, res));
}

const getUser = (req, res) => {

  console.log(`Get user by id :${req.params.userId}`);
  User.findById(req.params.userId)
    .orFail()
    .then((user)=>res.send(user))
    .catch(error => errorHandeling(error, res));
}*/

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then(user => res.send(user))
    .catch(error => errorHandeling(error, res));
};

const createUser = (req, res) => {
  if(req.method === "POST"){


    console.log(req.body)
    const { name, avatar, email, password} = req.body;

    if (!name || !avatar || !email || !password) {
      return sendError(BAD_REQUEST,{ message: `Missing required fields: [ ${!name?"name, ":""}${!avatar?"avatar, ":""}${!email?"email, ":""}${!password?"password ":""}]` }, res);
    }

      User.findOne({email})
      .then((user)=>{
        if (user) {
          const error = new Error('User with this email already exists');
          error.code = 11000;
          throw error;
        }
        return bcrypt.hash(password, 10);
        })
      .then(hashPassword =>{
        return User.create({ name, avatar , email, password: hashPassword})
          .then(user => res.status(201).send(user))
          .catch(error =>errorCreationHandeling(error, res));
      })
      .catch(error=>errorHandeling(error, res));
  }
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

module.exports = { /*getUsers, getUser,*/ createUser, login, getCurrentUser, updateCurrentUser};