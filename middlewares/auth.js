const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config')
const { sendError} = require("../utils/errors")

const { UNATHORIZED } = require("../utils/errorConstants");

const auth = (req, res, next)=>{
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return sendError(UNATHORIZED, { message: 'Authorization required'} , res);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return sendError(UNATHORIZED, { message: 'Invalid token' }, res);
  }

  req.user = payload;
  next();
}

module.exports = auth;