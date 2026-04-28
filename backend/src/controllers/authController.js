const {
  registerUserService,
  loginUserService,
} = require("../services/authService");

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

const login = async (req, res) => {
  try {
    const data = await loginUserService(req.body);

    res.status(200).json({
      message: "Login successful",
      ...data,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};