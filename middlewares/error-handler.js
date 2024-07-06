const { BadRequestError, UnauthorizedError, NotFoundError} = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (error.message === "Invalid email or password") {
    error = new UnauthorizedError('Invalid email or password');
  } else if (error.name === 'DocumentNotFoundError') {
    error = new NotFoundError('Document not found');
  } else if (error.name === 'CastError' || error.name === 'ValidationError') {
    error = new BadRequestError(error.message);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';



  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = {errorHandler};