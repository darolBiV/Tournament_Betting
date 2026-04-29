const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTournament,
  getAllTournaments,
} = require("../controllers/tournamentController");

const router = express.Router();

router.get("/", getAllTournaments);
router.post("/", authMiddleware, createTournament);

module.exports = router;