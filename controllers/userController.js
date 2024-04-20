import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../consts.js";

const register = async (req, res, next) => {
  // 1. Get data from request body
  const userData = req.body;

  // 2. Check to see whether the user already exists!
  // If a user with the email address already exists,
  // mongoose will throw an error! This is different to what we've seen
  // before, because in the previous case we would often look for data
  // in the database but not find it, which is NOT an error!
  // In this case though, we encounter an actual error, that only happens
  // when mongoose tries to write to the collection.
  //   Instead of giving mongoose bad data that it tries to write to the
  // database, we try to prevent that error from ever happening!

  // We want to check, whether the user already exists in the
  // database.
  // We can use the find method to look for specific documents
  // with a search query.
  // With the find() method you're looking for any number of documents
  // that match your search query.
  // In our case we won't ever have more than one document matching our
  // search though, because we'll search by email address and that is
  // a unique property in our database. Meaning if we have a user with
  // a certain email address, there cannot be another with the same address.
  // The find() method here does not really make sense! Because we can only ever
  // get back either an empty array or an array with one document.
  // We don't want mongoose to return an array, because an empty array is still
  // a truthy value (meaning Boolean([]) -> true)
  // What we want is mongoose to return null, when no user with the specified
  // email address was found.
  //   User.find({email: "user@gmail.com"}); -> []
  try {
    const userAlreadyExists = await User.findOne({ email: userData.email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ message: `User with email ${userData.email} already exists!` });
    }

    //  3. Do the passwords match?
    if (userData.password !== userData.confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirmPassword do not match." });
    }

    // 4. Hash the users password
    // take the password from userData and overwrite it with
    // its hashed version.
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    // 5. Create user in database
    // Because if we end up here, it means the user does not already exist
    // and the passwords do match.
    const newUser = await User.create(userData);
    // You can also use the spread operator to spread the request data into a new object
    // and then overwrite the password with the created hashed password like so:
    // const hashedPassword = await bcrypt.hash(userData.password, salt);
    // const newUser = await User.create({
    //   ...userData,
    //   password: hashedPassword,
    // });

    return res.status(200).json({
      message: `User ${userData.userName} has been created`,
      newUser: { userName: newUser.userName, email: newUser.email },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  // 1. Get the data from the frontend
  const { email, password } = req.body;
  // 2. Check that the user is registered -> email
  // I destructured the email from the req.body object. That just means we created
  // a variable with the name email with the value that came through in the request
  // When searching through our database for one specific document, we can use the
  // findOne method. We need to pass it an object that can be used for filtering (or finding)
  // by specifying as key's the parameters we want to filter on and as values what
  // value those parameters should take on.
  // So for example, a db document might look like this:
  //
  // {
  // email: "admin@gmail.com",
  // userName: "Administrator",
  // password:
  // "$2b$10$WjfHQ4gHamSkBnfwPL3ouerrc6uqpB9HS.8KY/cLnVNdy3wxotpXO",
  // role: "admin"
  // }
  // Now if we write User.findOne({email: "admin@gmail.com"}), we will find the
  // above document. However we want to make our query dynamic (based on the req.body).
  // We can use the amil from the request body and just tell the findOne() query function
  // to use the email as the value to filter for.
  // findOne({email}) is exactly equivalent (shorthand) for findOne({email: email})
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
      // return res.status(404).json({ message: "Invalid credentials" });
    }

    //  if so: continue
    // if not: send back a response saying: user with email not found.
    // 3. If we are in step 3, we found a user in our database matching the email,
    // so now, we'll check the password
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Create an identification token for the user on the frontend
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
