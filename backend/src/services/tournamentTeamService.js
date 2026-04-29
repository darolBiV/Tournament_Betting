const pool = require("../config/db");

const joinTournamentService = async ({ tournament_id, team_id }) => {
  const result = await pool.query(
    `INSERT INTO tournament_teams (tournament_id, team_id)
     VALUES ($1, $2)
     RETURNING *`,
    [tournament_id, team_id]
  );

  return result.rows[0];
};

const getTournamentTeamsService = async (tournamentId) => {
  const result = await pool.query(
    `SELECT teams.*
     FROM tournament_teams
     JOIN teams ON tournament_teams.team_id = teams.id
     WHERE tournament_teams.tournament_id = $1`,
    [tournamentId]
  );

  return result.rows;
};

module.exports = {
  joinTournamentService,
  getTournamentTeamsService,
};