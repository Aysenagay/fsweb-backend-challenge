const router = require("express").Router();
const Users = require("./users-model.js");
const { sinirli, checkTweetPayload } = require("../users/users-middleware.js");

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

router.post("/post", checkTweetPayload, async (req, res, next) => {
  try {
    let modelTweet = {
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      body: req.body.body,
      img_url: req.body.img_url,
    };

    const insertedTweet = await Users.createTweet(modelTweet);
    res.status(201).json(insertedTweet);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
