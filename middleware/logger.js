const logger = (req, res, next) => {
  req.kostas = "Good question";
  // req: Request object, that we can inspect to check for method, url, headers and data sent with the request
  // res: Response object that gets returned from the server when it's done with the request
  // next: Function to hand over request & response object to the next function within our server
  console.log(req.params);
  // Here we'll log out the request method and URL to always let us know when we have
  // an incoming request.
  console.log(`🚨 ${req.method} Request received at ${req.url}`);

  // some requests will also carry a body, which would be interesting to log as well.
  // If there is a body, we want to log it!
  if (Object.keys(req.body).length) {
    console.log("Request body: ", req.body);
  }

  //   When calling next() we signify to express, that we're done here and we want to pass
  // the request to the next function in our sever.
  next();
};

export default logger;
