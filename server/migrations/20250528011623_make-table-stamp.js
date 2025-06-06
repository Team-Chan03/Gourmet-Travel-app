/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('records', (table) => {
    table
      .integer('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users');
    table.increments('id').primary();
    table.string('region');
    table.decimal('latitude', 32, 15);
    table.decimal('longitude', 32, 15);
    table.string('image_url');
    table.string('comment');
    table.string('dishname');
    table.integer('rating').notNullable();
    table.timestamp('created_at').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('records');
};
