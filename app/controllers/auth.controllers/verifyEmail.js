const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");

async function verifyEmail(req, res) {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid Token" });
    }
    user.verified = true;
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

module.exports = verifyEmail;
