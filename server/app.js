
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const authRouter = require("./routers/authRouter");
const stampRouter = require("./routers/stampRouter");
const mapRouter = require("./routers/mapRouter");
const uploadImageRouter = require("./routers/uploadImageRouter");
const recordsRouter = require("./routers/recordsRouter");
const postRouter = require("./routers/postRouter");
const multer = require("multer");
const { log } = require("console");

const upload = multer(); // メモリストレージ
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // express でcookieを取得

const session = require('express-session');

app.use(
  session({
    secret: 'keyboard cat',
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
  console.log('🚀 ~ authMiddeware ~ sessionId:', sessionId);
  if (!sessionId) {
    //wentz:DBに保存してあるセッションIDと照合しなくていいのか。
    return res
      .status(401)
      .json({ error: '認証に失敗しました。セッションが無いか期限切れです。' });
  }

  const session = await db('sessions')
    .where({ sessions_id: sessionId })
    .first();
  console.log('🚀 ~ authMiddeware ~ session:', session);
  if (!session) {
    return res.status(401).json({ error: '無効なセッション' });
  }
  req.userId = session.user_id; //requestオブジェクトにuseId:user_idを追加
  next();
};

// dist 配信-----

app.use(express.static(path.join(__dirname, './public')));
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/records', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/mypage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/mypage/records', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/mypage/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/mypage/stamp', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// -------------

app.get('/api/app', authMiddeware, async (req, res) => {
  const user_id = req.userId;
  const user = await db('users').where({ user_id: user_id }).first();
  res
    .status(200)
    .json({ username: user.username, message: '認証に成功しました!' });
});

//ルーティング　api/formに来た時example.jsに飛ぶ
// app.use("/api/form", example);

//wentz:/auth以外は、aythMiddreware入れたい。

app.use("/api/auth", authRouter);
app.use("/api/map", mapRouter);
app.use("/api/stamp", stampRouter);
app.use("/api/records", recordsRouter);
app.use("/api/upload-image", uploadImageRouter);
app.use("/api/auth", authRouter);
app.use("/api/map", mapRouter);
app.use("/api/stamp", authMiddeware, stampRouter);
app.use("/api/post", postRouter);


module.exports = app;
