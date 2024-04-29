const fallthroughHandler = (req, res, next) => {

  return res.status(404).json({
    message: "No endpoint found under this address",
  });
};

export default fallthroughHandler;
