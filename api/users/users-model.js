const db = require("../../data/db-config.js");

function getAllTweets() {
  return db("tweets");
}

function getTweetById(user_id) {
  return db("tweets").where("user_id", user_id);
}

function getUserById(user_id) {
  return db("users").where("user_id", user_id);
}

async function createTweet(tweet) {
  const [insertedId] = await db("tweets").insert(tweet);
  const inserted = await db("tweets").where("tweet_id", insertedId).first();
  return inserted;
}

function remove(tweet_id) {
  return db("tweets").where("tweet_id", Number(tweet_id)).del();
}

async function createUser({ user_name, user_password, user_email }) {
  let created_user_id;
  await db.transaction(async (trx) => {
    const [user_id] = await trx("users").insert({
      user_name,
      user_password,
      user_email,
    });
    created_user_id = user_id;
  });
  return getUserById(created_user_id);
}

module.exports = {
  getAllTweets,
  getTweetById,
  createTweet,
  remove,
  createUser,
  getUserById,
};
