const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");
const verifyEmailbyNodeMailer = require("../../utils/verifyEmailbyNodeMailer");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const savedUser = await userModel.exists({ email });
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
      token,
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

module.exports = register;
