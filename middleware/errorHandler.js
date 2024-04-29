
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
 
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
