const fallthroughHandler = (req, res, next) => {
  // if we're in here, the request didn't hit any of our endpoints
  return res.status(404).json({
    message: "No endpoint found under this address",
  });
};

export default fallthroughHandler;
