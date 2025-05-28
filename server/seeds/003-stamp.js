/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("stamp").del();
  await knex("stamp").insert([
    {
      user_id: 1,
      stamp_num: 1,
      region: "愛知県",
      created_at: new Date(),
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
    },
    {
      user_id: 1,
      stamp_num: 1,
      region: "兵庫県",
      created_at: new Date(),
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
    },
    {
      user_id: 1,
      stamp_num: 2,
      region: "愛知県",
      created_at: new Date(),
      latitude: 35.123906092455555,
      longitude: 137.0659766255555,
    },
  ]);
};
