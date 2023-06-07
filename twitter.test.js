const db = require("./data/db-config");
const request = require("supertest");
const server = require("./api/server");

afterAll(async () => {
  await db.destroy();
});
beforeAll(async () => {
  await db.migrate.rollback(); // yapılan değişiklikleri geri alır.
  await db.migrate.latest(); // yapılan değişiklikleri günceller.
  await db.seed.run(); //veritabanını doldurur.
});

//Veritabanı için bir test ortamı oluşturmak için önceki göçleri geri alır, ardından en son göçleri uygular ve başlangıç verilerini veritabanına ekler.

/*
describe("TweetTestler", () => {
  test("[1] Get(/) methoduyla tüm tweetler geliyor mu", async () => {
    //act
    const allTweets = await request(server).get("/api/tweets");
    //assert
    expect(allTweets.statusCode).toBe(200);
    expect(allTweets.body.length).toBe(4);
  });

  test("[2] Get(/owner_id) methoduyla istenen id'deki kullanıcıa ait tweetler geliyor mu", () => {});
});

*/

describe("UserTestler", () => {
  test("[1]Post(/register) ile kayıt olunuyor mu?", async () => {
    //arrange
    const userData = {
      user_name: "AysenAgay",
      user_password: "123456",
      user_email: "aysen@example.com",
    };

    //act
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);

    //assert
    expect(actual.status).toBe(201);
    expect(actual.body[0]).toHaveProperty("user_name", "AysenAgay");
    expect(actual.body[0]).toHaveProperty("user_email", "aysen@example.com");
  });

  test("[2] Post(/register)eksik alan hata mesajı dönüyor mu?", async () => {
    //arrange
    const userData = {
      user_name: "Pikacu",
      user_password: "123456",
    };
    //act
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);

    //assert
    expect(actual.status).toBe(400);
    expect(actual.body).toHaveProperty("message", "Eksik alan var");
  });
  test("[3]Post(/login)bilgileri hatalı ise giriş yapılıyor mu?", async () => {
    //arrange
    const userData = {
      user_name: "AysenAgayA",
      user_password: "123456",
      user_email: "aysen@example.com",
      user_id: "4",
    };
    //act
    let actual = await request(server).post("/api/auth/login").send(userData);
    //assert
    expect(actual.status).toBe(401);
    //expect(actual.body[0]).toHaveProperty("user_name", "AysenAgay");
    //expect(actual.body[0]).toHaveProperty("user_email", "aysen@example.com");
  });
  test("[4]Get tüm kullanıcılar geliyor mu", async () => {
    // Arrange
    var loginPayload = {
      user_name: "AysenAgay",
      user_password: "123456",
      user_email: "aysen@example.com",
      user_id: "11",
    };
    let actual = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    expect(actual.status).toBe(200);
    // Act
    /* const response = await request(server)
      .get("/api/auth")
      .set("authorization", actual.body.token);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);*/
  });
  test("[5] Get ile tüm tweetler geliyor mu?", async () => {
    //act
    var loginPayload = {
      user_name: "AysenAgay",
      user_password: "123456",
      user_email: "aysen@example.com",
    };
    let actual = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    expect(actual.status).toBe(200);
    /// Act
    const response = await request(server)
      .get("/api/users/")
      .set("authorization", actual.body.token);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
