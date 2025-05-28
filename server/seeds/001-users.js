/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      username: "ume",
      email: "hideaki_umezawa@mail.toyota.co.jp",
      created_at: new Date(),
      password: "password",
      salt: "random",
    },
    {
      username: "matsu",
      email: "takuya_matsumot_ai@mail.toyota.co.jp",
      created_at: new Date(),
      password: "password2",
      salt: "random2",
    },
  ]);
};
