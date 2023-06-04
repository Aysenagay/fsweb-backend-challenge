const db = require("../../data/db-config.js");

function getAllTweets() {
  return db("tweets");
}

function getTweetById(user_id) {
  return db("tweets").where("user_id", user_id);
}

async function createTweet(tweet) {
  const [insertedId] = await db("tweets").insert(tweet);
  const inserted = await db("tweets").where("tweet_id", insertedId).first();
  return inserted;
}

function remove(tweet_id) {
  return db("tweets").where("tweet_id", Number(tweet_id)).del();
}

module.exports = {
  getAllTweets,
  getTweetById,
  createTweet,
  remove,
};
