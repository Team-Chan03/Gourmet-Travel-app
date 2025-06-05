const { TwitterApi } = require('twitter-api-v2');
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  try {
    // const path = req.body.path.replace(/\\/g, "/").slice(2);
    // console.log('path', path, req.body.path);
    console.log('エンドポイント到着');

    const twitterInstance = new TwitterApi({
      appKey: process.env.APP_KEY,
      appSecret: process.env.APP_KEY_SECRET,
      accessToken: process.env.ACCES_TOKEN,
      accessSecret: process.env.ACCES_TOKEN_SECRET,
    });

    const client = twitterInstance.readWrite;

    const response = await fetch(req.body.url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const mediaId = await client.v2.uploadMedia(buffer, {
      media_type: 'image/png',
    });
    console.log(mediaId);

    client.v2.tweet({
      text: req.body.text,
      media: { media_ids: [mediaId] },
    });

    res.status(200).json(req.body);
  } catch (err) {
    console.error('🔥 /api/test error post to X', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
