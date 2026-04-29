const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { generateBracket } = require("../controllers/bracketController");

const router = express.Router();

router.post("/generate/:tournamentId", authMiddleware, generateBracket);

module.exports = router;