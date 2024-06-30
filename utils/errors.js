const {BAD_REQUEST, NOT_FOUND, DEFAULT, USER_ALREADY_EXIST, UNATHORIZED} = require("./errorConstants")


const sendError = (code, msg, res)=> res.status(code).send({ message: msg });

const errorHandeling = (error, res, isLoggin = false) =>
{
  console.log(error);
  console.log(error.name);
  let errorCode = DEFAULT;
  if (error.name === 'DocumentNotFoundError') {
    errorCode = isLoggin? UNATHORIZED: NOT_FOUND;
  }else if (error.name === 'CastError') {
    errorCode = BAD_REQUEST;
  }
  return sendError(errorCode, error.message, res);
}

const errorCreationHandeling = (error, res) =>
{
  if (error.code === 11000) {
    return sendError(USER_ALREADY_EXIST, { message: 'User with this email already exists' }, res);
  }

  let errorCode = DEFAULT;
  if(error.name === "ValidationError"){
    errorCode = BAD_REQUEST;
  }

  return sendError(errorCode, error.message, res);
}

module.exports = { sendError, errorCreationHandeling, errorHandeling};