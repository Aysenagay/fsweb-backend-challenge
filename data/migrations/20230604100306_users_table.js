/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("user_id");
      table.string("user_name").notNullable();
      table.string("user_email").notNullable().unique();
      table.string("user_password").notNullable();
    })
    .createTable("tweets", (table) => {
      table.increments("tweet_id");
      table.string("user_name").notNullable();
      table.string("img_url");
      table.string("body").notNullable();
      table.timestamps("created_at").defaultTo(knex.fn.now());
      table
        .integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("tweets");
};
