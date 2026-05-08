const pool = require("../config/db");
const { settleBetsForMatchService } = require("./betService");

const createMatchService = async ({
  tournament_id,
  team1_id,
  team2_id,
  match_date,
  created_by,
}) => {
  const result = await pool.query(
    `INSERT INTO matches (tournament_id, team1_id, team2_id, match_date, created_by)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [tournament_id, team1_id, team2_id, match_date, created_by]
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

const updateMatchResultService = async ({
  matchId,
  team1_score,
  team2_score,
}) => {
  const matchResult = await pool.query(
    "SELECT * FROM matches WHERE id = $1",
    [matchId]
  );

  if (matchResult.rows.length === 0) {
    throw new Error("Match not found");
  }

  const match = matchResult.rows[0];

  let winner_team_id = null;

  if (team1_score > team2_score) {
    winner_team_id = match.team1_id;
  } else if (team2_score > team1_score) {
    winner_team_id = match.team2_id;
  } else {
    throw new Error("Draw is not allowed in this tournament format");
  }

  const updatedMatchResult = await pool.query(
    `UPDATE matches
     SET team1_score = $1,
         team2_score = $2,
         winner_team_id = $3,
         status = 'finished'
     WHERE id = $4
     RETURNING *`,
    [team1_score, team2_score, winner_team_id, matchId]
  );

  const updatedMatch = updatedMatchResult.rows[0];

  const settledBetsCount = await settleBetsForMatchService(
    updatedMatch.id,
    updatedMatch.winner_team_id
  );

  if (updatedMatch.next_match_id && updatedMatch.next_match_slot) {
    const slotColumn =
      updatedMatch.next_match_slot === 1 ? "team1_id" : "team2_id";

    await pool.query(
      `UPDATE matches
       SET ${slotColumn} = $1
       WHERE id = $2`,
      [winner_team_id, updatedMatch.next_match_id]
    );
  }

  return {
    ...updatedMatch,
    settled_bets_count: settledBetsCount,
  };
};

module.exports = {
  createMatchService,
  getTournamentMatchesService,
  updateMatchResultService,
};