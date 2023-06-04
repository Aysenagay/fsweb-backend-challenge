const router = require("express").Router();
const Users = require("./users-model.js");
const { sinirli } = require("../users/users-middleware.js");

router.get("/", sinirli, (req, res, next) => {
  Users.getAllTweets()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/:user_id", sinirli, (req, res, next) => {
  Users.getTweetById(req.params.user_id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

module.exports = router;
