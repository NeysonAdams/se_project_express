
const sendError = (code, msg, res)=> res.status(code).send({ message: msg });

const errorHandeling = (error, res) =>
{
  let error_code = 500;
  if (error.name === 'DocumentNotFoundError') {
    error_code = 404;
  }else if (error.name === 'CastError') {
    error_code = 400;
  }
  return sendError(error_code, error.message? error.message: error, res);
}

const errorCreationHandeling = (error, res) =>
{
  let error_code = 500;
  if(error.name === "ValidationError"){
    error_code = 404;
  }
  return sendError(error_code, error.message? error.message: error, res);
}

module.exports = { sendError, errorCreationHandeling, errorHandeling};