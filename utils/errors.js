
const sendError = (code, msg, res)=> res.status(code).send({ message: msg });

const errorHandeling = (error, res) =>
{
  let errorCode = 500;
  if (error.name === 'DocumentNotFoundError') {
    errorCode = 400;
  }else if (error.name === 'CastError') {
    errorCode = 404;
  }
  return sendError(errorCode, error.message? error.message: error, res);
}

const errorCreationHandeling = (error, res) =>
{
  let errorCode = 500;
  if(error.name === "ValidationError"){
    errorCode = 404;
  }
  return sendError(errorCode, error.message? error.message: error, res);
}

module.exports = { sendError, errorCreationHandeling, errorHandeling};