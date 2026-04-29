const {
  createTournamentService,
  getAllTournamentsService,
} = require("../services/tournamentService");

const createTournament = async (req, res) => {
  try {
    const tournament = await createTournamentService({
      ...req.body,
      created_by: req.user.id,
    });

    res.status(201).json({
      message: "Tournament created successfully",
      tournament,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await getAllTournamentsService();

    res.status(200).json({
      tournaments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTournament,
  getAllTournaments,
};