/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("records").del();
  await knex("records").insert([
    {
      user_id: 1,
      image_url:
        "https://sozaiya-san.jp/wp-content/uploads/2023/06/%E8%AA%BF%E7%90%86%E5%8A%A0%E5%B7%A5%E9%A3%9F%E5%93%81%E9%A1%9E_%E3%81%9F%E3%81%91%E3%81%AE%E3%81%93%E3%81%94%E9%A3%AF_002_168mm_153g.png",
      comment: "うまうま！！",
      created_at: new Date(),
    },
  ]);
};
