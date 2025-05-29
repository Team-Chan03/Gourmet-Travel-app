/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sessions").del();
  await knex("sessions").insert([
    { user_id: 1, sessions_id: "qwertyuiop", created_at: new Date() },
    { user_id: 2, sessions_id: "awertyuiop", created_at: new Date() },
    { user_id: 3, sessions_id: "bwertyuiop", created_at: new Date() },
    { user_id: 4, sessions_id: "dwertyuiop", created_at: new Date() },
    { user_id: 5, sessions_id: "ewertyuiop", created_at: new Date() },
  ]);
};
