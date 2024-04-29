import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../consts.js";

const register = async (req, res, next) => {
 
  const userData = req.body;

  try {
    const userAlreadyExists = await User.findOne({ email: userData.email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ message: `User with email ${userData.email} already exists!` });
    }


    if (userData.password !== userData.confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirmPassword do not match." });
    }

   
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    
    const newUser = await User.create(userData);
  

    return res.status(200).json({
      message: `User ${userData.userName} has been created`,
      newUser: { userName: newUser.userName, email: newUser.email },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
      
    }

  
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return res.status(200).json({ token, payload });
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
};
