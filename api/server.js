const express = require("express");
const helmet = require("helmet");
const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server Error!...",
  });
});
module.exports = server;
