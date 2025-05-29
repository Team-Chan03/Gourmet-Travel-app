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
      user_id: 2,
      stamp_num: 1,
      region: "愛知県",
      created_at: new Date(),
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
    },
    {
      user_id: 3,
      stamp_num: 1,
      region: "愛知県",
      created_at: new Date(),
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
    },
    {
      user_id: 4,
      stamp_num: 1,
      region: "愛知県",
      created_at: new Date(),
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
    },
    {
      user_id: 5,
      stamp_num: 1,
      region: "滋賀県",
      created_at: new Date(),
      latitude: 35.124406092471046,
      longitude: 136.0639866288227,
    },
  ]);
};
