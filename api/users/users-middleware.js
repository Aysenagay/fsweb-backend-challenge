const router = require("express").Router();
const {
  usernameVarmi,
  rolAdiGecerlimi,
  checkPayload,
} = require("./auth-middleware");
const { JWT_SECRET } = require("../secrets"); // bu secret'ı kullanın!
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const userModel = require("../users/users-model");
