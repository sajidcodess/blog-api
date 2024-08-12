const express = require("express");
const register = require("../controllers/auth.controllers/register");
const login = require("../controllers/auth.controllers/login");
const verifyEmail = require("../controllers/auth.controllers/verifyEmail");
const authMiddleware = require("../middleware/auth.middleware");
const deleteUser = require("../controllers/auth.controllers/deleteUser");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail)
router.delete("/delete-user", authMiddleware, deleteUser)

module.exports = router;
