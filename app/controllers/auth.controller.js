const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const verifyEmailbyNodeMailer = require("../utils/verifyEmail");
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const savedUser = await userModel.findOne({ email });
    if (savedUser) {
      return res.status(403).json({
        success: false,
        error:
          "An account associated to this email already exist, please try loggin in.",
      });
    }

    const user = new userModel({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const verificationLink = `${req.hostname}/api/auth/verify-email?token=${token}`;

    verifyEmailbyNodeMailer(user.email, verificationLink);

    res.status(201).json({
      success: true,
      message:
        "To complete your registration, we've sent you a verification email. Please click the link in the email to verify your account.",
    });
  } catch (error) {
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

    if (!user.varified) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const verificationLink = `${req.hostname}/api/auth/verify-email?token=${token}`;
      verifyEmailbyNodeMailer(user.email, verificationLink);
      return res.status(401).json({
        success: false,
        message:
          "The user is registered but the email is not varifeid, we have sent a verification link to the entered email, please first verify the email and try logging in again.",
      });
    }

    res.status(200).json({ success: true, message: "successfully logged in" });
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

async function verifyEmail(req, res) {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid Token" });
    }
    user.varified = true;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Email verified sucessfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: `Error while verifying: ${error}` });
  }
}

module.exports = { login, register, verifyEmail };
