const {BAD_REQUEST, NOT_FOUND, DEFAULT, USER_ALREADY_EXIST, UNATHORIZED, CONFLICT} = require("./errorConstants")


const sendError = (code, msg, res)=> res.status(code).send({ message: msg });

const errorHandeling = (error, res, isLoggin = false) =>
{
  console.log(error);
  console.log(error.name);
  let errorCode = DEFAULT;
  if (error.message === "Invalid email or password") {
    errorCode =UNATHORIZED;
  }
  else if (error.name === 'DocumentNotFoundError') {
    errorCode = isLoggin? UNATHORIZED: NOT_FOUND;
  }else if ((error.name === 'CastError') || (error.name === "ValidationError")) {
    errorCode = BAD_REQUEST;
  }
  return sendError(errorCode, error.message, res);
}

const errorCreationHandeling = (error, res) =>
{
  if (error.code === 11000) {
    return sendError(USER_ALREADY_EXIST, 'User with this email already exists', res);
  }

  let errorCode = DEFAULT;
  if (error.name === 'DocumentNotFoundError') {
    errorCode = CONFLICT;
  }else if(error.name === "ValidationError"){
    errorCode = BAD_REQUEST;
  }

  return sendError(errorCode, error.message, res);
}

module.exports = { sendError, errorCreationHandeling, errorHandeling};