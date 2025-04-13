/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }

  // Determine status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Set status code
  res.status(statusCode);
  
  // Send error response
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

module.exports = errorHandler;
