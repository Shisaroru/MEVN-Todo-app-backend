import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";

import { config } from "./config.js";
import { ResponseError } from "./class/ResponseError.js";

import userRouter from "./routes/userRouter.js";
import workRouter from "./routes/workRouter.js";

const app = express();
const server = createServer(app);

// Accept json request
app.use(express.json());

// Enable CORS
app.use(cors());

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(config.port, () => {
  console.log("Server is listening on port " + config.port);
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/work", workRouter);

// Handle 404 route, this should be at the end of every other routes
app.use((req, res, next) => {
  return next(new ResponseError(404, "Not Found"));
});

// Error handling middleware, this should be at the end of this file
app.use((err, req, res, next) => {
  return res.status(err.statusCode).json({
    message: err.message,
  });
});
