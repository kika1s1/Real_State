const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    statusCode:err.statusCode || 500,
    success: false,
    error: err.message || "Server Error",
  });
};

export default errorHandler;
