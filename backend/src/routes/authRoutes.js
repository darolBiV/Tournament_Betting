const express = require("express");
const { register } = require("../controllers/authController");
const { registerValidation } = require("../validators/authValidator");
const validateRequest = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);

module.exports = router;