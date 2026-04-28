const { registerUserService } = require("../services/authService");

const register = async (req, res) => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
};