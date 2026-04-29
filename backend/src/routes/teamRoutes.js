const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTeam,
  getAllTeams,
} = require("../controllers/teamController");

const router = express.Router();

router.get("/", getAllTeams);
router.post("/", authMiddleware, createTeam);

module.exports = router;