const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check if the headers have already been sent
  if (res.headersSent) {
    return next(err);
  }

  // Check for specific error types and set status codes and messages accordingly
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: err.message,
    });
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({
      message: 'Invalid ID format',
      details: 'The ID provided is not in the correct format.',
    });
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    // Duplicate key error
    return res.status(409).json({
      message: 'Duplicate Entry',
      details: 'An entry with the same unique key already exists.',
    });
  }

  // Default to a 500 error if no specific error type is matched
  res.status(500).json({
    message: 'Internal Server Error',
    details: err.message || 'An unexpected error occurred.',
  });
};

export default errorHandler;