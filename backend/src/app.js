const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

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