const User = require('../models/users');
const { sendError, errorCreationHandeling, errorHandeling} = require("../utils/errors")

const getUsers = (req, res)=>{
  console.log("Get Users");
  User.find()
    .then((users)=>res.status(200).send(users))
    .catch(error => sendError(500, error.message, res));
}

const getUser = (req, res) => {

  console.log(`Get user by id :${req.params.userId}`);
  User.findById(req.params.userId)
    .orFail()
    .then((user)=>res.status(200).send(user))
    .catch(error => errorHandeling(error.message, res));
}

const createUser = (req, res) => {
  if(req.method === "POST"){

    console.log(req.method);
    const { name, avatar } = req.body;

    User.create({ name, avatar })
      .then(user => res.status(201).send(user))
      .catch(error => errorCreationHandeling(error.message, res));
  }
};

module.exports = { getUsers, getUser, createUser };