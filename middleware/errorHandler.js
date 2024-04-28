// The error handler is a bit different than our other middlewares,
// because it will only be called if there is an error.
// That error gets transferred from the catch block of our endpoint
// to our middleware by using next(error).
// This error object is then available here in our errorHandler function
const errorHandler = (error, req, res, next) => {
  if (error.name === "JsonWebTokenError") {
    return res.status(403).json({ message: "Please Login." });
  }
  if (error.name === "CastError") {
    return res.status(400).json({
      message:
        "The ID you provided was not valid. Please make sure that you used a correct ObjectId. To see all valid object ids, make a GET request to the /cats route.",
    });
  }

  console.log(error);
  //   if we don't know what exactly went wrong, but there was an error
  // we'll send a 500 with an internal server error message
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
