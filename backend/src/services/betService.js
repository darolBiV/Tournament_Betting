const pool = require("../config/db");

const createBetService = async ({ user_id, match_id, team_id, amount }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const walletResult = await client.query(
      "SELECT * FROM wallets WHERE user_id = $1 FOR UPDATE",
      [user_id]
    );

    if (walletResult.rows.length === 0) {
      throw new Error("Wallet not found");
    }

    const wallet = walletResult.rows[0];

    if (Number(wallet.balance) < Number(amount)) {
      throw new Error("Not enough balance");
    }

    const matchResult = await client.query(
      "SELECT * FROM matches WHERE id = $1",
      [match_id]
    );

    if (matchResult.rows.length === 0) {
      throw new Error("Match not found");
    }

    const match = matchResult.rows[0];

    if (match.status !== "scheduled") {
      throw new Error("Bets are allowed only for scheduled matches");
    }

    if (match.team1_id !== team_id && match.team2_id !== team_id) {
      throw new Error("Selected team does not participate in this match");
    }

    const coefficient = 2.0;
    const potentialWin = Number(amount) * coefficient;

    const betResult = await client.query(
      `INSERT INTO bets (user_id, match_id, team_id, amount, coefficient, potential_win)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, match_id, team_id, amount, coefficient, potentialWin]
    );

    await client.query(
      `UPDATE wallets
       SET balance = balance - $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $2`,
      [amount, user_id]
    );

    await client.query(
      `INSERT INTO transactions (user_id, type, amount, description)
       VALUES ($1, $2, $3, $4)`,
      [user_id, "bet", amount, `Bet placed on match ${match_id}`]
    );

    await client.query("COMMIT");

    return betResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getUserBetsService = async (user_id) => {
  const result = await pool.query(
    `SELECT 
        bets.*,
        teams.name AS team_name,
        matches.status AS match_status
     FROM bets
     JOIN teams ON bets.team_id = teams.id
     JOIN matches ON bets.match_id = matches.id
     WHERE bets.user_id = $1
     ORDER BY bets.created_at DESC`,
    [user_id]
  );

  return result.rows;
};

module.exports = {
  createBetService,
  getUserBetsService,
};