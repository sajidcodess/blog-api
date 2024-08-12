const express = require("express");
const register = require("../controllers/auth.controllers/register");
const login = require("../controllers/auth.controllers/login");
const verifyEmail = require("../controllers/auth.controllers/verifyEmail");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail)

module.exports = router;
