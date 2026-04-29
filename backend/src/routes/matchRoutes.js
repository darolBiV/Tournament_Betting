const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createMatch, getTournamentMatches, updateMatchResult } = require("../controllers/matchController");

const router = express.Router();

router.post("/", authMiddleware, createMatch);
router.get("/tournament/:tournamentId", getTournamentMatches);
router.put("/:id/result", authMiddleware, updateMatchResult);

module.exports = router;