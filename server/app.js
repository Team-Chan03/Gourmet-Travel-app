const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const example = require("./routers/example");
const multer = require("multer");
const { log } = require("console");
const upload = multer(); // メモリストレージ

const app = express();

app.use(cors());
app.use(express.json());

// dist 配信-----
app.use(express.static(path.join(__dirname, "./public")));

// -------------
app.get("/api/records", async (req, res) => {
  try {
    const list = await db("records").select("*").orderBy("created_at", "desc");
    res.status(200).json(list);
  } catch (err) {
    console.error("🔥 /api/records error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/upload-image", upload.single("image"), async (req, res) => {
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

app.post("/api/records", async (req, res) => {
  //緯度経度ここで取得してテーブルにインサートする
  console.log("このデータを今後インサートしていく予定", req.body);
  res.json(req.body);
});

//ルーティング　api/formに来た時example.jsに飛ぶ
// app.use("/api/form", example);
module.exports = app;
