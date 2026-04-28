const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const registerUserService = async ({ username, email, password }) => {
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const roleResult = await pool.query(
    "SELECT id FROM roles WHERE name = $1",
    ["user"]
  );

  const roleId = roleResult.rows[0].id;

  const userResult = await pool.query(
    `INSERT INTO users (username, email, password_hash, role_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username, email, role_id, created_at`,
    [username, email, hashedPassword, roleId]
  );

  await pool.query(
    "INSERT INTO wallets (user_id, balance) VALUES ($1, $2)",
    [userResult.rows[0].id, 1000]
  );

  return userResult.rows[0];
};

const loginUserService = async ({ email, password }) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role_id: user.role_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role_id: user.role_id,
    },
  };
};

module.exports = {
  registerUserService,
  loginUserService,
};