const { BadRequestError, UnauthorizedError, NotFoundError} = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.message === "Invalid email or password") {
    err = new UnauthorizedError('Invalid email or password');
  } else if (err.name === 'DocumentNotFoundError') {
    err = new NotFoundError('Document not found');
  } else if (err.name === 'CastError' || err.name === 'ValidationError') {
    err = new BadRequestError(err.message);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';



  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = {errorHandler};