const pool = require("../config/db");

const shuffleTeams = (teams) => {
  // TODO: later replace random shuffle with custom seeding logic(позже добавим норм логику )
  return [...teams].sort(() => Math.random() - 0.5);
};

const generateBracketService = async ({ tournamentId, bestOf = 1, createdBy }) => {
  const teamsResult = await pool.query(
    `SELECT teams.*
     FROM tournament_teams
     JOIN teams ON tournament_teams.team_id = teams.id
     WHERE tournament_teams.tournament_id = $1`,
    [tournamentId]
  );

  const teams = teamsResult.rows;

  if (teams.length < 2) {
    throw new Error("At least 2 teams are required to generate bracket");
  }

  const shuffledTeams = shuffleTeams(teams);

  const totalTeams = shuffledTeams.length;
  const firstRoundMatchesCount = Math.ceil(totalTeams / 2);

  const createdMatches = [];

  for (let i = 0; i < firstRoundMatchesCount; i++) {
    const team1 = shuffledTeams[i * 2] || null;
    const team2 = shuffledTeams[i * 2 + 1] || null;

    const result = await pool.query(
      `INSERT INTO matches 
      (tournament_id, team1_id, team2_id, round_number, match_order, bracket_type, best_of, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        tournamentId,
        team1 ? team1.id : null,
        team2 ? team2.id : null,
        1,
        i + 1,
        "upper",
        bestOf,
        createdBy,
      ]
    );

    createdMatches.push(result.rows[0]);
  }

  let previousRoundMatches = createdMatches;
  let roundNumber = 2;

  while (previousRoundMatches.length > 1) {
    const currentRoundMatches = [];
    const matchesCount = Math.ceil(previousRoundMatches.length / 2);

    for (let i = 0; i < matchesCount; i++) {
      const result = await pool.query(
        `INSERT INTO matches 
        (tournament_id, round_number, match_order, bracket_type, best_of, status, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [tournamentId, roundNumber, i + 1, "upper", bestOf, "pending", createdBy]
      );

      currentRoundMatches.push(result.rows[0]);
    }

    for (let i = 0; i < previousRoundMatches.length; i++) {
      const nextMatch = currentRoundMatches[Math.floor(i / 2)];
      const slot = i % 2 === 0 ? 1 : 2;

      await pool.query(
        `UPDATE matches
         SET next_match_id = $1,
             next_match_slot = $2
         WHERE id = $3`,
        [nextMatch.id, slot, previousRoundMatches[i].id]
      );
    }

    previousRoundMatches = currentRoundMatches;
    roundNumber++;
  }

  return {
    message: "Bracket generated successfully",
    total_teams: totalTeams,
    first_round_matches: firstRoundMatchesCount,
  };
};

module.exports = {
  generateBracketService,
};