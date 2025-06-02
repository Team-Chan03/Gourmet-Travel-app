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

router.post('/', async (req, res) => {
  //緯度経度ここで取得してテーブルにインサートする
  console.log('このデータを今後インサートしていく予定', req.body);
  const { latitude, longitude, user_id, rating, created_at, comment, image_url } = req.body;

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
      image_url,
      latitude,
      longitude,
      user_id,
      rating,
      region,
      comment,
      created_at,
    }
  );

  await db('records').insert({
    latitude,
    longitude,
    user_id,
    rating,
    created_at,
    province: region,
  });

  res.json(req.body);
});

module.exports = router;
