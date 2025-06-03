const express = require("express");
const router = express.Router();
const db = require("../db");

//ピン立て用のデータ取得
router.get("/data1", async (req, res) => {
  const {userId} = req.cookies
  console.log(userId);
  
  try {
    const infomations = await db
      .select("id", "latitude", "longitude ", "image_url", "comment","dishname")
      .where({user_id:userId})
      .table("records");

    res.status(200).send(infomations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "取得に失敗しました" });
  }
});

//地図塗り用のデータ取得
router.get("/data2", async (req, res) => {
  try {
    const maxcheck = {};
    const returnArray = [];
    const infomations = await db.select("id", "region", "latitude", "longitude ", "image_url", "comment", "dishname").table("records");

    for (const obj of infomations) {
      maxcheck[obj.region] = obj.stamp_num;
    }

    for (const key in maxcheck) {
      const returnObj = {};
      console.log(key);
      (returnObj["region"] = key), (returnObj["count"] = maxcheck[key]);
      returnArray.push(returnObj);
    }

    res.status(200).send(returnArray);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "取得に失敗しました" });
  }
});

module.exports = router;
