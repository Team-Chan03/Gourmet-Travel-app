/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sessions").del();
  await knex("sessions").insert([
    { user_id: 1, sessions_id: "qwertyuiop", created_at: new Date() },
  ]);
};
