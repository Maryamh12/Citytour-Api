import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../consts.js";
import User from "../models/user.js";

const auth = async (req, res, next) => {
  const rawToken = req.headers.authorization;
  console.log(rawToken);

  if (!rawToken) {
    return res.status(404).json({ message: "Please Logedin" });
  }

  const token = rawToken.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

  
    const foundUser = await User.findById(decoded.id).select(
      "id userName email role"
    );


    if (!foundUser) {
      return res.status(403).json({
        message: "User  with that Email and Password doesn't exist",
      });
    }

 
    req.currentUser = foundUser;

    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
