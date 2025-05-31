const express = require("express");
const router = express.Router();
const db = require("../db");

//スタンプの情報取得
router.get("/", async (req, res) => {
  const userId = req.userId;  //wentzメモ：ここおかしい。正しくはreq.paramsなのか、req.cookieなのか
  const results = await db("stamp")
    .where({ user_id: userId }) //ログインユーザに限定
    .orderBy("created_at", "desc");
  res.json(results);
});

module.exports = router;
