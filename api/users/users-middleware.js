const { JWT_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken");

const sinirli = (req, res, next) => {
  try {
    let authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({ message: "Token gereklidir" });
    } else {
      jwt.verify(authHeader, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "token gecersizdir" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

const checkTweetPayload = (req, res, next) => {
  try {
    let { user_id, user_name, body } = req.body;
    if (!user_id || !user_name || !body) {
      res.status(400).json({ messsage: "Eksik alan var" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sinirli,
  checkTweetPayload,
};
