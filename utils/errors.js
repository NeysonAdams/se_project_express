
const sendError = (code, msg, res)=> res.status(code).send({ message: msg });

const errorHandeling = (error, res) =>
{
  console.log(error);
  console.log(error.name);
  let errorCode = 500;
  if (error.name === 'DocumentNotFoundError') {
    errorCode = 400;
  }else if (error.name === 'CastError') {
    errorCode = 404;
  }
  return sendError(errorCode, error.message, res);
}

const errorCreationHandeling = (error, res) =>
{
  console.log(error);
  console.log(error.name);
  let errorCode = 500;
  if(error.name === "ValidationError"){
    errorCode = 404;
  }
  return sendError(errorCode, error.message, res);
}

module.exports = { sendError, errorCreationHandeling, errorHandeling};