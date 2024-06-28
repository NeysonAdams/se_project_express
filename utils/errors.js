const {BAD_REQUEST, NOT_FOUND, DEFAULT} = require("./errorConstants")


const sendError = (code, msg, res)=> res.status(code).send({ message: msg });

const errorHandeling = (error, res) =>
{
  console.log(error);
  console.log(error.name);
  let errorCode = DEFAULT;
  if (error.name === 'DocumentNotFoundError') {
    errorCode = NOT_FOUND;
  }else if (error.name === 'CastError') {
    errorCode = BAD_REQUEST;
  }
  return sendError(errorCode, error.message, res);
}

const errorCreationHandeling = (error, res) =>
{
  console.log(error);
  console.log(error.name);
  let errorCode = DEFAULT;
  if(error.name === "ValidationError"){
    errorCode = BAD_REQUEST;
  }
  return sendError(errorCode, error.message, res);
}

module.exports = { sendError, errorCreationHandeling, errorHandeling};