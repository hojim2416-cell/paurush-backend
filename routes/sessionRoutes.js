const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createSession,
  getAllSessions,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");

// Public
router.get("/", getAllSessions);

// Admin Only
router.post("/", protect, admin, createSession);

router.put("/:id", protect, admin, updateSession);

router.delete("/:id", protect, admin, deleteSession);

module.exports = router;