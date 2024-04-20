import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../consts.js";
// In order for us to connect to our mongo database, we can use the connect function
// from mongoose.
// Reaching out of the Backend means we have to await the response from the
// database server, meaning this is an asynchronous operation.
export const connectToDb = async () => {
  // The mongoose.connect() function takes the connection string as argument,
  // which is made up by this pattern:
  // DB_FLAVOUR://HOST:PORT/DATABASE_NAME
  mongoose.set("strictQuery", false);
  return mongoose.connect(DB_CONNECTION_STRING);
  // return mongoose.connect("mongodb://localhost:27017/cats");
};
