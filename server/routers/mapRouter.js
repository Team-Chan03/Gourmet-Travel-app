const express = require('express');
const router = express.Router();
const db = require('../db');

//ピン立て用のデータ取得
router.get('/data1', async (req, res) => {
  try {
    const infomations = await db
      .select('latitude', 'longitude ')
      .table('stamp');

    res.status(200).send(infomations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '取得に失敗しました' });
  }
});

module.exports = router;
