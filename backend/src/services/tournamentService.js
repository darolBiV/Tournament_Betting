const pool = require("../config/db");

const createTournamentService = async ({
  title,
  description,
  max_teams,
  created_by,
}) => {
  const result = await pool.query(
    `INSERT INTO tournaments (title, description, max_teams, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, description, max_teams, created_by]
  );

  return result.rows[0];
};

const getAllTournamentsService = async () => {
  const result = await pool.query(
    `SELECT tournaments.*, users.username AS creator
     FROM tournaments
     JOIN users ON tournaments.created_by = users.id
     ORDER BY tournaments.created_at DESC`
  );

  return result.rows;
};

module.exports = {
  createTournamentService,
  getAllTournamentsService,
};