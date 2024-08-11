const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await userModel.create({ username, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(username, email, password, token);
    res.status(201).json({ success: true, token: token });
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      res
        .status(401)
        .json({ success: false, error: "The access tokan has expired" });
    }
    res.status(400).json({
      success: false,
      error: error.message,
      requiredFormat: "JSON",
      Example: {
        username: "nick",
        email: "example@gmail.com",
        password: "123four",
      },
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, Error: "invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      requiredFormat: "JSON",
      Example: {
        email: "example@gmail.com",
        password: "123four",
      },
    });
  }
}

module.exports = { login, register };
