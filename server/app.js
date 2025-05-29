const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const authRouter = require("./routers/authRouter");
const stampRouter = require("./routers/stampRouter");
const mapRouter = require("./routers/mapRouter");
const multer = require("multer");
const { log } = require("console");
const upload = multer(); // メモリストレージ
const passport = require("passport");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // express でcookieを取得

const session = require("express-session");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//認証用ミドルウェア
const authMiddeware = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  console.log("🚀 ~ authMiddeware ~ sessionId:", sessionId);
  if (!sessionId) {
    return res
      .status(401)
      .json({ error: "認証に失敗しました。セッションが無いか期限切れです。" });
  }

  const session = await db("sessions")
    .where({ sessions_id: sessionId })
    .first();
  console.log("🚀 ~ authMiddeware ~ session:", session);
  if (!session) {
    return res.status(401).json({ error: "無効なセッション" });
  }
  req.userId = session.user_id; //requestオブジェクトにuseId:user_idを追加
  next();
};

// dist 配信-----
app.use(express.static(path.join(__dirname, "./public")));

// -------------

app.get("/api/app", authMiddeware, async (req, res) => {
  const user_id = req.userId;
  const user = await db("users").where({ user_id: user_id }).first();
  res
    .status(200)
    .json({ username: user.username, message: "認証に成功しました!" });
});

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

app.use("/api/auth", authRouter);
app.use("/api/map", mapRouter);
app.use("/api/stamp", authMiddeware, stampRouter);

module.exports = app;
