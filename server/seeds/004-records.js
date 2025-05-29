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
      image_url: "https://i.ibb.co/k2bVrZLP/6b13d77d4703.jpg",
      comment: "うまうま！！",
      rating: 1,
      created_at: new Date(),
    },
    {
      user_id: 2,
      image_url: "https://i.ibb.co/h1FZb2CR/4a4affc1de4d.jpg",
      comment: "うまうま！！",
      rating: 3,
      created_at: new Date(),
    },
    {
      user_id: 3,
      image_url: "https://i.ibb.co/SX10ZT6F/61d518c5312a.jpg",
      comment: "うまうま！！",
      rating: 5,
      created_at: new Date(),
    },
    {
      user_id: 4,
      image_url:
        "https://imgbp.hotp.jp/magazine/media/item_images/images/157/545/260/original/ad3c2473-1e46-45b1-9d14-84637a776a42.jpg",
      comment: "うまうま！！",
      rating: 3,
      created_at: new Date(),
    },
    {
      user_id: 5,
      image_url:
        "https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg",
      comment: "うまうま！！",
      rating: 2,
      created_at: new Date(),
    },
  ]);
};
