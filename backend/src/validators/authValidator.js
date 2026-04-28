const { body } = require("express-validator");

const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = {
  registerValidation,
};