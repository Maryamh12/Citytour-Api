import express from "express";
import { connectToDb } from "./utils/db.js";
import logger from "./middleware/logger.js";
import router from "./router.js";
import fallthroughHandler from "./middleware/fallthroughHandler.js";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(router);
app.use(errorHandler);
app.use(fallthroughHandler);

// since connectToDb is an asynchronous function, we have to wrap it inside of another function,
// so that it's not at the top level anymore. Node often complains when asynchronous functions get called
// from the top of a module. So we can't actually use the await keyword at the top level.
const startServer = async () => {
  await connectToDb();
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startServer();
