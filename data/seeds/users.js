/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("tweets").truncate();

  const defaultTweets = [
    {
      img_url:
        "https://images.freeimages.com/fic/images/icons/1994/vista_style_business_and_data/256/users.png?ref=findicons",
      user_name: "Aysen",
      body: "About",
      user_id: "1",
    },
    {
      img_url:
        "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png",
      user_name: "Ahmet",
      body: "Yaz geliyor",
      user_id: "2",
    },
    {
      img_url:
        "https://img.favpng.com/14/6/3/computer-icons-user-profile-avatar-woman-png-favpng-YdKuA8GaKJMLBvX70sbctFDSh.jpg",
      user_name: "Ahmet",
      body: "Hayat şaşırtır hep zaten",
      user_id: "2",
    },
  ];
  const defaultUsers = [
    {
      user_email: "aysen@gmail.com",
      user_password: "123456",
      user_name: "Ayşen",
    },
    {
      user_email: "ahmet@gmail.com",
      user_password: "1234567",
      user_name: "Ahmet",
    },
  ];

  await knex("users").insert(defaultUsers);
  await knex("tweets").insert(defaultTweets);
};
