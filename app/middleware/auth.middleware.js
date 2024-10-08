const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({
          success: false,
          message: "JWT token not found in the headers.authorization: if you don't have one try to login to get a fresh token",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res
        .status(403)
        .json({
          success: false,
          message:
            "Invalid Token: No user in our DB found associated to this token",
        });
    }


    if (!user.verified) {
      return res.status(403).json({success: false, message: "The user associated to this token in our DB has unvarifed email, please varify the email by loggin in"})
    }

    req.user = user

    next();
  } catch (error) {
    res.status(403).json({ success: false, error: error });
  }
}

module.exports = authMiddleware
