const express = require("express");
const router = express.Router();
const db = require("../db");
// import axios from "axios";

router.get("/", async (req, res) => {
  try {
    const list = await db("records").select("*").orderBy("created_at", "desc");
    res.status(200).json(list);
  } catch (err) {
    console.error("🔥 /api/records error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  //緯度経度ここで取得してテーブルにインサートする
  console.log("このデータを今後インサートしていく予定", req.body);
  const { latitude, longitude, user_id, rating, created_at } = req.body;

  const resMap = await fetch(
    js`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );

  const data = await resMap.json();
  const province = data.address.province;

  console.log(
    `🚀 ~ router.post ~   {
    latitude, longitude, user_id, stamp_num, created_at, province;
  }:`,
    {
      latitude,
      longitude,
      user_id,
      rating,
      created_at,
      province,
    }
  );

  res.json(req.body);
});

module.exports = router;

// app.post("/api/records", async (req, res) => {
//   const [newList] = await db("records").insert(req.body).returning("*");
//   res.status(201).json(newList);
// });

// {
//   user_id: 1,
//   image_url: 'https://i.ibb.co/d45kZ8Tc/f946efe51ae7.jpg',
//   comment: 'asfds',
//   rating: 1,
//   latitude: 35.12389524329782,
//   longitude: 137.06594352173974,
//   created_at: '2025-05-29T06:02:15.427Z'
// }

// stamp
// {
//   user_id: 3,
//   stamp_num: 1,
//   region: "愛知県",
//   created_at: new Date(),
//   latitude: 35.123906092471046,
//   longitude: 137.0659766288227,
// },

// records
// {
//   user_id: 3,
//   image_url: "https://i.ibb.co/SX10ZT6F/61d518c5312a.jpg",
//   comment: "うまうま！！",
//   rating: 5,
//   created_at: new Date(),
// },
