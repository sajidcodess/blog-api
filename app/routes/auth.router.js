const { login, register, verifyEmail } = require("../controllers/auth.controller");
const express = require("express");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail)

module.exports = router;
