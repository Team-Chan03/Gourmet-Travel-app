const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const example = require("./routers/example");
const authRouter = require("./routers/authRouter");

const app = express();

app.use(cors());
app.use(express.json());

// dist 配信-----
app.use(express.static(path.join(__dirname, "./public")));

// -------------

//ルーティング　api/formに来た時example.jsに飛ぶ
// app.use("/api/form", example);

app.use("/api/auth", authRouter);

module.exports = app;
