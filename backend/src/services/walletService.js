const pool = require("../config/db");

const getWalletService = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM wallets WHERE user_id = $1",
    [userId]
  );

  return result.rows[0];
};

const getTransactionsService = async (userId) => {
  const result = await pool.query(
    `SELECT *
     FROM transactions
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};

module.exports = {
  getWalletService,
  getTransactionsService,
};