/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("stamp", (table) => {
    table
      .integer("user_id")
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.increments("id").primary();
    table.integer("stamp_num");
    table.string("region");
    table.timestamp("created_at").notNullable();
    table.decimal("latitude", 32, 15);
    table.decimal("longitude", 32, 15);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("stamp");
};
