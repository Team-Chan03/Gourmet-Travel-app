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
      username: "ume1",
      email: "hideaki_umezawa@mail.toyota.co.jp",
      created_at: new Date(),
      password: "password1",
      salt: "random1",
    },
    {
      username: "ume2",
      email: "hideaki_umezawa@mail.toyota.co.jp",
      created_at: new Date(),
      password: "password2",
      salt: "random2",
    },
    {
      username: "ume3",
      email: "hideaki_umezawa@mail.toyota.co.jp",
      created_at: new Date(),
      password: "password3",
      salt: "random3",
    },
    {
      username: "matsu",
      email: "takuya_matsumot_ai@mail.toyota.co.jp",
      created_at: new Date(),
      password: "password4",
      salt: "random4",
    },
  ]);
};
