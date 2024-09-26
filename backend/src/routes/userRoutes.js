// routes/userRoutes.js
const express = require("express");
const {
  register,
  login,
  getUserProfile,
  createTeacher,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", protect, getUserProfile);

// Admin routes
router.post("/create-teacher", protect, admin, createTeacher); // Only admin can create teachers

module.exports = router;
