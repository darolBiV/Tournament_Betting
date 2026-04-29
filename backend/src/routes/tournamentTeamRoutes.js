const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  joinTournament,
  getTournamentTeams,
} = require("../controllers/tournamentTeamController");

const router = express.Router();

router.post("/", authMiddleware, joinTournament);
router.get("/:id", getTournamentTeams);

module.exports = router;