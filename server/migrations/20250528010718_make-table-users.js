/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("user_id").primary();
    table.string("username").notNullable();
    table.string("email").notNullable();
    table.timestamp("created_at").notNullable();
    table.string("password");
    table.string("salt");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("users");
};
