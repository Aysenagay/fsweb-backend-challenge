const { JWT_SECRET } = require("../secrets"); // bu secreti kullanın!
const userModel = require("../users/users-model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const usernameVarmi = async (req, res, next) => {
  try {
    let isExist = await userModel.getUserById(req.body.user_id);
    if (isExist && isExist.length > 0) {
      let currentUser = isExist[0];
      let isPasswordMatch = bcryptjs.compareSync(
        req.body.user_password,
        currentUser.user_password
      );
      if (!isPasswordMatch) {
        res.status(401).json({
          message: "Geçersiz kriter",
        });
      } else {
        req.currentUser = currentUser;
        next();
      }
    } else {
      res.status(401).json({
        message: "Geçersiz kriter",
      });
    }
  } catch (error) {
    next(error);
  }
};

const checkPayload = (req, res, next) => {
  try {
    let { user_email, user_password } = req.body;
    if (!user_email || !user_password) {
      res.status(400).json({ messsage: "Eksik alan var" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  usernameVarmi,
  checkPayload,
};
