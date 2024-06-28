
const sendError = (code, message, res)=> res.status(code).send({ message: message });

const errorHandeling = (error, res) =>
{
  console.log(error);
  console.log(error.name);
  console.log(error.message);
  if (error.name === 'DocumentNotFoundError') {
    return sendError(404, error.message, res);
  }else if (error.name === 'CastError') {
    return sendError(400, error.message, res);
  }
  return sendError(500, error.message? error.message: error, res);
}

const errorCreationHandeling = (error, res) =>
{
  console.log(error);
  if(error.name === "ValidationError"){
    return sendError(404, error.message? error.message: error, res);;
  }
  else if (error.name === "TypeError")
  {
    return sendError(404, error.message? error.message: error, res);;
  }
  return sendError(500, error.message? error.message: error, res);
}

module.exports = { sendError, errorCreationHandeling, errorHandeling};