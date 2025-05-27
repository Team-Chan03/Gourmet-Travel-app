const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const formRouter = require("./routers/formRouter");

const app = express();

app.use(cors());
app.use(express.json());

// dist 配信-----
app.use(express.static(path.join(__dirname, "./public")));

// -------------

// app.use("/api/form", formRouter);
module.exports = app;
