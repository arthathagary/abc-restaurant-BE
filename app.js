const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const users = require("./routes/user");
const authenticateToken = require("./lib/authToken");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// app.options("/api/v1/login", cors());

app.use("/api/v1", users);

module.exports = app;
