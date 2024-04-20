import dotenv from "dotenv";

dotenv.config();

// Create a global constant for the db connection string. If we run our app locally now,
// we probably won't set a connection string in our .env file but instead we'll just use
// our local database.
// If we run it on a deployed server (production / dev), we'll set on that server the environment
// variable to the specific database.
export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/cats";
// If there is an environment variable called "DB_CONNECTION_STRING" assign it to the constant
// DB_CONNECTION_STRING otherwise use the string specified after (our local db)
export const JWT_SECRET = process.env.JWT_SECRET || "pineapple";

console.log("Environment variables are defined as");
console.log({ DB_CONNECTION_STRING, JWT_SECRET });
