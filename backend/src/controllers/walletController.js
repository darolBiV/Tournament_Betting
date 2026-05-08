const {
  getWalletService,
  getTransactionsService,
} = require("../services/walletService");

const getWallet = async (req, res) => {
  try {
    const wallet = await getWalletService(req.user.id);

    res.status(200).json({ wallet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await getTransactionsService(req.user.id);

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWallet,
  getTransactions,
};