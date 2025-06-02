/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('sessions').del();
  await knex('users').del();

  const crypto = require('crypto');

  function hashPassword(password, salt) {
    return crypto
      .createHash('sha256')
      .update(salt + password)
      .digest('hex');
  }

  const testSalt = crypto.randomBytes(6).toString('hex');
  const testHashedPassword = hashPassword('pass', testSalt);

  await knex('users').insert([
    {
      username: 'yuta',
      email: 'hideaki_umezawa@mail.toyota.co.jp',
      created_at: new Date(),
      password: testHashedPassword,
      salt: testSalt,
    },
    {
      username: 'wentz',
      email: 'hideaki_umezawa@mail.toyota.co.jp',
      created_at: new Date(),
      password: testHashedPassword,
      salt: testSalt,
    },
    {
      username: 'kito',
      email: 'hideaki_umezawa@mail.toyota.co.jp',
      created_at: new Date(),
      password: testHashedPassword,
      salt: testSalt,
    },
    {
      username: 'ume',
      email: 'hideaki_umezawa@mail.toyota.co.jp',
      created_at: new Date(),
      password: testHashedPassword,
      salt: testSalt,
    },
    {
      username: 'matsu',
      email: 'takuya_matsumot_ai@mail.toyota.co.jp',
      created_at: new Date(),
      password: testHashedPassword,
      salt: testSalt,
    },
  ]);
};
