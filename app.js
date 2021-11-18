const express = require("express");
const connect = require("./configs/db");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("colors");

dotenv.config(); // set .env
const app = express(); // create express app
app.use(cors()); // cors policy
app.use(express.json()); // body parsed

const userRoutes = require("./routes/user");
app.use("/api", userRoutes);

// error handling
app.use((error, req, res, next) => {
  console.log(`${error}`.red.bold);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

// DB COnnect
connect();

const port = process.env.PORT || 8080;
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${port}`.bgBlack.yellow
  )
);
