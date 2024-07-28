const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/", (req, res) => {
  res.send("received post request")
})

module.exports = app
