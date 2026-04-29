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
const { updateMatchResultService } = require("../services/matchService");

const updateMatchResult = async (req, res) => {
  try {
    const match = await updateMatchResultService({
      matchId: req.params.id,
      ...req.body,
    });

    res.status(200).json({
      message: "Match result updated",
      match,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = {
  createMatch,
  getTournamentMatches,
  updateMatchResult
};