const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createBet,
  getMyBets,
} = require("../controllers/betController");

const router = express.Router();

router.post("/", authMiddleware, createBet);
router.get("/my", authMiddleware, getMyBets);

module.exports = router;