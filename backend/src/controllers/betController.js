const {
  createBetService,
  getUserBetsService,
} = require("../services/betService");

const createBet = async (req, res) => {
  try {
    const bet = await createBetService({
      user_id: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      message: "Bet placed successfully",
      bet,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getMyBets = async (req, res) => {
  try {
    const bets = await getUserBetsService(req.user.id);

    res.status(200).json({
      bets,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBet,
  getMyBets,
};