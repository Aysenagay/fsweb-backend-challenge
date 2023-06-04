const router = require("express").Router();
const { JWT_SECRET } = require("../secrets");
const userModel = require("../users/users-model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

router.post("/register", async (req, res, next) => {
  try {
    let hashedPassword = bcryptjs.hashSync(req.body.user_password);
    let userRequestModel = {
      user_name: req.body.user_name,
      user_password: hashedPassword,
      user_email: req.body.user_email,
    };
    const registeredUser = await userModel.createUser(userRequestModel);
    res.status(201).json(registeredUser);
  } catch (error) {
    next(error);
  }
});
router.post("/login", (req, res, next) => {
  try {
    let payload = {
      subject: req.currentUser.user_id,
      user_name: req.currentUser.user_name,
      user_email: req.currentUser.user_email,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    res.json({
      message: `${req.currentUser.user_name} geri geldi!`,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
