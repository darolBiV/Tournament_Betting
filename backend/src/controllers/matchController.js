const {
  createMatchService,
  getTournamentMatchesService,
} = require("../services/matchService");

const createMatch = async (req, res) => {
  try {
    const match = await createMatchService(req.body);

    res.status(201).json({
      message: "Match created successfully",
      match,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getTournamentMatches = async (req, res) => {
  try {
    const matches = await getTournamentMatchesService(req.params.tournamentId);

    res.status(200).json({
      matches,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMatch,
  getTournamentMatches,
};