const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require("crypto");
require("./../passport"); //passport.jsの設定の読み込み
const passport = require("passport");

function hashPassword(password, salt) {
  return crypto
    .createHash("sha256")
    .update(salt + password)
    .digest("hex");
}

//登録処理
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const salt = crypto.randomBytes(6).toString("hex");
  const hashedPassword = hashPassword(password, salt);

  try {
    await db("users").insert({
      username,
      email,
      salt: salt,
      password: hashedPassword,
      created_at: new Date(),
    });
    res.status(201).json({ message: "ユーザ登録成功" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "登録に失敗しました" });
  }
});

//ログイン処理
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 入力されたuser名が存在しなければerror
  try {
    const user = await db("users").where({ username }).first();

    // 入力されたuser名が存在しなければerror
    if (!user) {
      return res.status(401).json({ error: "ユーザー名が存在しません" });
    }

    // 入力されたパスワードと、usersの記録から取得したsaltを組み合わせてhash化
    const inputHash = hashPassword(password, user.salt);
    if (inputHash !== user.password) {
      return res.status(401).json({ error: "パスワードが間違ってます" });
    }

    // ログインが成功したらセッションを手動で作成
    const sessionId = crypto.randomBytes(16).toString("hex");
    await db("sessions").insert({
      sessions_id: sessionId,
      user_id: user.user_id,
      created_at: new Date(),
    });
    res.cookie("sessionId", sessionId, { httpOnly: true });
    res.json({ message: "ログイン成功" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ログインエラー" });
  }
});

//ログアウト処理
router.post("/logout", async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;
    await db("sessions").where("sessions_id", sessionId).del();

    res.clearCookie("sessionId");
    res.json({ message: "ログアウト成功" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ログアウトエラー" });
  }
});

//①認証開始
router.get(
  "/google",
  passport.authenticate("google", {
    //googleは使用するStrategy名。passport.jsで定義。googleはディフォルト
    scope: ["email", "profile"], //Googleに要求するユーザの情報範囲指定
  })
);

const frontUrl = process.env.FRONT_URL || "/";
//②認証成功後、指定したcallbackurlでリクエストが戻ってくる
router.get(
  "/google/callback",
  passport.authenticate("google", {
    //この部分でStrategyで定義したverify関数が実行（passport.js)。verify関数：要求したprofileとかの処理
    failureRedirect: frontUrl, //認証失敗後、ここにリダイレクト
  }),
  (req, res) => {
    //verify関数がOKならこのリクエストが実行される。
    res.cookie("sessionId", req.sessionId, { httpOnly: true });
    res.redirect(`${frontUrl}records`);
    // res.redirect("http://localhost:5173/records");
  }
);

module.exports = router;
