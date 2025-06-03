const { TwitterApi } = require('twitter-api-v2');
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  try {
    const twitterInstance = new TwitterApi({
      appKey: process.env.APP_KEY,
      appSecret: process.env.APP_KEY_SWCRET,
      accessToken: process.env.ACCES_TOKEN,
      accessSecret: process.env.ACCES_TOKEN_SECRET,
    });

    const client = twitterInstance.readWrite;

    client.v2.tweet({ text: 'こんにちは、これは通常のツイートです。' });

    res.status(200).json('テストの投稿です！！');
  } catch (err) {
    console.error('🔥 /api/test error post to X', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
