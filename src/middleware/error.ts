
export const error = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    err = new Error(message);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
