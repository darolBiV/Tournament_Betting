const { generateBracketService } = require("../services/bracketService");

const generateBracket = async (req, res) => {
  try {
    const result = await generateBracketService({
      tournamentId: req.params.tournamentId,
      bestOf: req.body.best_of || 1,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateBracket,
};