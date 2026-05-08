const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const pool = require("./config/db");
const tournamentRoutes = require("./routes/tournamentRoutes");
const teamRoutes = require("./routes/teamRoutes");
const tournamentTeamRoutes = require("./routes/tournamentTeamRoutes");
const matchRoutes = require("./routes/matchRoutes");
const bracketRoutes = require("./routes/bracketRoutes");
const betRoutes = require("./routes/betRoutes");
const walletRoutes = require("./routes/walletRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/tournament-teams", tournamentTeamRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/brackets", bracketRoutes);
app.use("/api/bets", betRoutes);
app.use("/api/wallet", walletRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;