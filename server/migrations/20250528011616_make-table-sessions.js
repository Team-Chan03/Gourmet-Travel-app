/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("sessions", (table) => {
    table
      .integer("user_id")
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.string("sessions_id").notNullable();
    table.timestamp("created_at").notNullable();
    table.increments("id").primary();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("sessions");
};
