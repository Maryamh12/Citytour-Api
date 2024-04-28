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
  // Both versions work perfectly in our case. The replace method here is just a tiny bit more robust,
  // in the there is no Bearer included in our token, the replace method won't throw an error
  //   const token = rawToken.split(" ")[1];

  //   Verification of our token using our JWT_secret.
  // If not able to verify, this function will throw an error!
  //   If it can be verified, we get back the decoded payload of the token.
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    //   In our payload we expect an ID! -> some identifying information about who made the request
    //   With the id we can now check our database using our User Model.
    const foundUser = await User.findById(decoded.id).select(
      "id userName email role"
    );
    //   If instead of selecting explicitly certain fields, you'd rather unselect a field
    // you can just put a minus in front of the field
    //   const foundUser = await User.findById(decoded.id).select("-password");

    if (!foundUser) {
      return res.status(403).json({
        message: "User  with that Email and Password doesn't exist",
      });
    }

    // We attach the foundUser to our request object and then continue passing it down
    // to the intended endpoint.
    // req.currentUser = foundUser;
    req.currentUser = foundUser;

    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
