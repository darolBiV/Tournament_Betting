const {
  createTeamService,
  getAllTeamsService,
} = require("../services/teamService");

const createTeam = async (req, res) => {
  try {
    const team = await createTeamService({
      ...req.body,
      captain_id: req.user.id,
    });

    res.status(201).json({
      message: "Team created successfully",
      team,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await getAllTeamsService();

    res.status(200).json({
      teams,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
};