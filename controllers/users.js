
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const { JWT_SECRET } = require('../utils/config');
const { BadRequestError, NotFoundError, ConflictError } = require('../utils/errors')


const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(new NotFoundError('User not found'))
    .then(user => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
    console.log(req.body)
    const { name, avatar, email, password} = req.body;

    if (!name || !avatar || !email || !password) {
      throw new BadRequestError(`Missing required fields: [ ${!name?"name, ":""}${!avatar?"avatar, ":""}${!email?"email, ":""}${!password?"password ":""}]`);
    }

    return  User.findOne({email})
      .then((user)=>{
        if (user) {
          throw new ConflictError('User with this email already exists');
        }
        return bcrypt.hash(password, 10);
        })
      .then(hashPassword => User.create({ name, avatar , email, password: hashPassword}))
      .then(user => res.status(201).send({ name: user.name, avatar: user.avatar, email: user.email }))
      .catch(next);
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body)
  User.findUserByCredentials(email, password)
    .then(user=>{
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next)
}

const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true, context: 'query' }
  )
    .orFail()
    .then(user => res.send(user))
    .catch(next);
};

module.exports = { createUser, login, getCurrentUser, updateCurrentUser};