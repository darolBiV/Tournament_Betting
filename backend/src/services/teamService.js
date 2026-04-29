const pool = require("../config/db");

const createTeamService = async ({ name, description, captain_id }) => {
  const teamResult = await pool.query(
    `INSERT INTO teams (name, description, captain_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, description, captain_id]
  );

  const team = teamResult.rows[0];

  await pool.query(
    `INSERT INTO team_members (team_id, user_id)
     VALUES ($1, $2)`,
    [team.id, captain_id]
  );

  return team;
};

const getAllTeamsService = async () => {
  const result = await pool.query(
    `SELECT teams.*, users.username AS captain
     FROM teams
     JOIN users ON teams.captain_id = users.id
     ORDER BY teams.created_at DESC`
  );

  return result.rows;
};

module.exports = {
  createTeamService,
  getAllTeamsService,
};