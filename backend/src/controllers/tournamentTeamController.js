const {
  joinTournamentService,
  getTournamentTeamsService,
} = require("../services/tournamentTeamService");

const joinTournament = async (req, res) => {
  try {
    const data = await joinTournamentService(req.body);

    res.status(201).json({
      message: "Team joined tournament",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getTournamentTeams = async (req, res) => {
  try {
    const teams = await getTournamentTeamsService(req.params.id);

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
  joinTournament,
  getTournamentTeams,
};