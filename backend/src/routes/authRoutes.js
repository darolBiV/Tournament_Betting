const express = require("express");
const { registerValidation } = require("../validators/authValidator");
const validateRequest = require("../middleware/validationMiddleware");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected profile route",
    user: req.user,
  });
});
module.exports = router;