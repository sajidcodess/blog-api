const bodyParser = require('body-parser')
const express = require("express");
const app = express();

app.use(bodyParser.json)

app.get("/", (req, res) => {
  res.send(`req: ${req} and res: ${res}`);
});

app.post("/", (req, res) => {
  res.send("received post request")
})

module.exports = app
