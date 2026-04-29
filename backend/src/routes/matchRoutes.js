const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createMatch,
  getTournamentMatches,
} = require("../controllers/matchController");

const router = express.Router();

router.post("/", authMiddleware, createMatch);
router.get("/tournament/:tournamentId", getTournamentMatches);

module.exports = router;