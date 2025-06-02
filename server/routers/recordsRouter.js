const express = require('express');
const router = express.Router();
const db = require('../db');
// import axios from "axios";

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

//ユウタ:自分の投稿だけを取ってくるAPI
router.get('/:user_id', async (req, res) => {
  try {
    const list = await db('records')
      .select('*')
      .where('user_id', req.params.user_id)
      .orderBy('created_at', 'desc');
    res.status(200).json(list);
  } catch (err) {
    console.error('🔥 /api/records/:user error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/submit', async (req, res) => {
  //緯度経度ここで取得してテーブルにインサートする
  console.log('このデータを今後インサートしていく予定', req.body);
  const { latitude, longitude, user_id, rating, created_at } = req.body;

  const resMap = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );

  const data = await resMap.json();
  //wentz:provinceに県名が入る
  const region = data.address.province;

  console.log(
    `🚀 ~ router.post ~   {
    latitude, longitude, user_id, stamp_num, created_at, province;
  }:`,
    {
      img_url,
      latitude,
      longitude,
      user_id,
      rating,
      created_at,
      region,
      comment,  
    }
  );

  const submitObj = {
    img_url,
    latitude,
    longitude,
    user_id,
    rating,
    created_at,
    region,
    comment,
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
