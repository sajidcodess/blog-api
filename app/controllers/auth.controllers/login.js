
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");
const verifyEmailbyNodeMailer = require("../../utils/verifyEmailbyNodeMailer");

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

    if (!user.verified) {
      const verificationLink = `${req.hostname}/api/auth/verify-email?token=${token}`;
      verifyEmailbyNodeMailer(user.email, verificationLink);
      return res.status(401).json({
        success: false,
        message:
          "The user is registered but the email is not varifeid, we have sent a verification link to the entered email, please first verify the email and try logging in again.",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "successfully logged in", token });
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

module.exports = login;
