const pool = require("../config/db");

const createMatchService = async ({
  tournament_id,
  team1_id,
  team2_id,
  match_date,
}) => {
  const result = await pool.query(
    `INSERT INTO matches (tournament_id, team1_id, team2_id, match_date)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [tournament_id, team1_id, team2_id, match_date]
  );

  return result.rows[0];
};

const getTournamentMatchesService = async (tournamentId) => {
  const result = await pool.query(
    `SELECT 
        matches.*,
        team1.name AS team1_name,
        team2.name AS team2_name,
        winner.name AS winner_name
     FROM matches
     JOIN teams AS team1 ON matches.team1_id = team1.id
     JOIN teams AS team2 ON matches.team2_id = team2.id
     LEFT JOIN teams AS winner ON matches.winner_team_id = winner.id
     WHERE matches.tournament_id = $1
     ORDER BY matches.created_at ASC`,
    [tournamentId]
  );

  return result.rows;
};

module.exports = {
  createMatchService,
  getTournamentMatchesService,
};