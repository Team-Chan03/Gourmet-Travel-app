const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer(); // メモリストレージ

router.post("/", upload.single("image"), async (req, res) => {
  console.log("/api/upload-image呼ばれた！");

  // reqを文字列型にする　　URLSearchParamsしてるから必要
  const base64 = req.file.buffer.toString("base64");

  // バイナリ以外の方法は multipartからform-dataに切り替えてheaders

  //  URLSearchParams に詰める
  //10日間（864000秒）
  const params = new URLSearchParams({
    image: base64,
    expiration: "864000",
  });

  // imgbb API へ POST
  const imgbbRes = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    }
  );

  const json = await imgbbRes.json();
  // ④ 返ってきた JSON をそのまま返す—or—URL だけ返す

  console.log("🚀 ~ app.post ~ json.data.url:", json.data.url);
  return res.json({ url: json.data.url });
});

module.exports = router;
