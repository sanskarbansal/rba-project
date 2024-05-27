// routes/auth.js
const express = require("express");

const { authenticateToken, authorizeRoles } = require("../middleware/auth");
const authController = require("../controllers/authController.js");
const User = require("../models/User.js");

const router = express.Router();

// Register a new user
router.post("/register", authController.register);

// Log in a user
router.post("/login", authController.login);

// Log out a user
router.post("/logout", authController.logout);

// Access protected route
router.get("/profile", authenticateToken, async (req, res) => {
    const { token } = req.cookies;

    res.json({ token, role: req.user.role, userId: req.user.id });
});

module.exports = router;
