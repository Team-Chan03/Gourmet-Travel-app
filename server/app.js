const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const authRouter = require("./routers/authRouter");
const stampRouter = require("./routers/stampRouter");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("http://localhost:5173/");
  }
);

// dist 配信-----
app.use(express.static(path.join(__dirname, "./public")));
// -------------

//ルーティング　api/formに来た時example.jsに飛ぶ
// app.use("/api/form", example);

app.use("/api/auth", authRouter);
app.use("/api/stamp", stampRouter);

module.exports = app;
