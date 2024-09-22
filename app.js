const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');


const users = require("./routes/user");
const reservation = require("./routes/reservation");
const menu = require("./routes/menu");
const order = require("./routes/order");
const query = require("./routes/query");
const gallery = require("./routes/gallery");







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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/uploads', express.static(path.join(__dirname, 'uploads')));



app.use("/api/v1", users);
app.use("/api/v1", reservation);
app.use("/api/v1", gallery);
app.use("/api/v1",order)
app.use("/api/v1", query);
app.use("/api/v1",menu)
app.use('/api/v1', uploadRoutes);




module.exports = app;
