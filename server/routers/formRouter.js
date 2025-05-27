const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  //   const userId = req.userId;
  //   // console.log("🚀 ~ router.get ~ userId:", userId);
  //   const results = await db("histories")
  //     .where({ user_id: userId }) //ログインユーザに限定
  //     .orderBy("created_at", "desc")
  //     .limit(30);
  //   res.json(results);
});

module.exports = router;
