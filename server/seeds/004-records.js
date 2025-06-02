/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('records').del();
  await knex('records').insert([
    {
      user_id: 1,
      region: '愛知県',
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
      image_url: 'https://i.ibb.co/k2bVrZLP/6b13d77d4703.jpg',
      comment: 'うまうま！！',
      dishname: '肉',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 2,
      region: '愛知県',
      created_at: new Date(),
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
      image_url: 'https://i.ibb.co/h1FZb2CR/4a4affc1de4d.jpg',
      comment: 'うまうま！！',
      dishname: 'ニク',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 3,
      region: '愛知県',
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
      image_url: 'https://i.ibb.co/SX10ZT6F/61d518c5312a.jpg',
      comment: 'うまうま！！',
      dishname: 'にく',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 4,
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
      image_url:
        'https://imgbp.hotp.jp/magazine/media/item_images/images/157/545/260/original/ad3c2473-1e46-45b1-9d14-84637a776a42.jpg',
      comment: 'うまうま！！',
      dishname: 'ひつまぶし',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },

    {
      user_id: 4,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      dishname: 'うどん',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 5,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      dishname: '海鮮丼',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 3,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      dishname: 'ケーキ',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 5,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      dishname: 'サラダ',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 1,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      dishname: 'そば',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 5,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      dishname: 'しゃぶしゃぶ',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 3,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      dishname: 'どて煮',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 5,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      dishname: 'とんかつ',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 4,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      dishname: '焼肉',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 5,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      dishname: '刺身',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
  ]);
};
