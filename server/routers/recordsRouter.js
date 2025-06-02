const express = require('express');
const router = express.Router();
const db = require('../db');

//wentz:自分の投稿以外も取ってくるAPI
router.get('/', async (req, res) => {
  try {
    const list = await db('records').select('*').orderBy('created_at', 'desc');
    res.status(200).json(list);
  } catch (err) {
    console.error('🔥 /api/records error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/user', async (req, res) => {
  const { userId } = req.cookies;
  try {
    const list = await db('records')
      .select('*')
      .where('user_id', Number(userId))
      .orderBy('created_at', 'desc');
    res.status(200).json(list);
  } catch (err) {
    console.error('🔥 /api/records/:user error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/submit', async (req, res) => {
  //緯度経度ここで取得してテーブルにインサートする
  // console.log('このデータを今後インサートしていく予定', req.body);
  const {
    image_url,
    latitude,
    longitude,
    user_id,
    rating,
    created_at,
    comment,
    dishname,
  } = req.body;

  const resMap = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );

  const data = await resMap.json();
  //wentz:provinceに県名が入る
  const region = data.address.province;

  const submitObj = {
    image_url,
    latitude,
    longitude,
    user_id,
    rating,
    created_at,
    region,
    comment,
    dishname,
  };

  try {
    const list = await db('records').insert(submitObj);
    res.status(200).json(submitObj);
  } catch (err) {
    console.error('🔥 /api/records/submit', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
