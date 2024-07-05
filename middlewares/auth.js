const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config')
const {UnauthorizedError} = require("../utils/errors")

const { UNATHORIZED } = require("../utils/errorConstants");

const auth = (req, res, next)=>{
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization required');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }

  req.user = payload;
  return next();
}

module.exports = auth;