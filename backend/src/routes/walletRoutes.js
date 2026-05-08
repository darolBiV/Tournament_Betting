const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getWallet,
  getTransactions,
} = require("../controllers/walletController");

const router = express.Router();

router.get("/", authMiddleware, getWallet);
router.get("/transactions", authMiddleware, getTransactions);

module.exports = router;