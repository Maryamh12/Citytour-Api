const logger = (req, res, next) => {
  req.kostas = "Good question";
 
  console.log(req.params);
 
  console.log(`🚨 ${req.method} Request received at ${req.url}`);

  if (Object.keys(req.body).length) {
    console.log("Request body: ", req.body);
  }

 
  next();
};

export default logger;
