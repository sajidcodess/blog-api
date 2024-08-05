const bodyParser = require('body-parser')
const express = require("express");
const { connectDB } = require('./config/db');
const app = express();

// connect to MongoDB 
connectDB()

app.use(bodyParser.json)

app.get("/", (req, res) => {
  res.send(`req: ${req} and res: ${res}`);
});

app.post("/", (req, res) => {
  res.send("received post request")
})

module.exports = app
