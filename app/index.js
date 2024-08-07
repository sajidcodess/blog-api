const express = require("express");
const connectDB = require("./config/db.js");
const authRouter = require("./routes/auth.router.js");

const app = express();

// connect to MongoDB
connectDB();

app.use(express.json())

app.use("/api/auth", authRouter);

app.get('/', (req, res) => {
  res.send('heeyeye')
})



module.exports = app;
