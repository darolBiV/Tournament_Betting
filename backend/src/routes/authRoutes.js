const express = require("express");
const { registerValidation } = require("../validators/authValidator");
const validateRequest = require("../middleware/validationMiddleware");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);
router.post("/login", login);
module.exports = router;