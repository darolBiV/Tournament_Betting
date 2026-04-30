import { useEffect, useState } from "react";
import api from "../api/api";

function MatchesPage() {
  const [tournamentId, setTournamentId] = useState("");
  const [matches, setMatches] = useState([]);

  const [generateForm, setGenerateForm] = useState({
    tournament_id: "",
    best_of: 1,
  });

  const [resultForm, setResultForm] = useState({
    match_id: "",
    team1_score: "",
    team2_score: "",
  });

  const fetchMatches = async (id) => {
    try {
      const res = await api.get(`/matches/tournament/${id}`);
      setMatches(res.data.matches);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load matches");
    }
  };

  // 🔥 автозагрузка при заходе
  useEffect(() => {
    const savedId = localStorage.getItem("tournament_id");

    if (savedId) {
      setTournamentId(savedId);
      fetchMatches(savedId);
    }
  }, []);

  const handleLoadMatches = (e) => {
    e.preventDefault();

    localStorage.setItem("tournament_id", tournamentId); // сохраняем
    fetchMatches(tournamentId);
  };

  const handleGenerateChange = (e) => {
    setGenerateForm({
      ...generateForm,
      [e.target.name]: e.target.value,
    });
  };

  const generateBracket = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/brackets/generate/${generateForm.tournament_id}`, {
        best_of: Number(generateForm.best_of),
      });

      alert("Bracket generated");

      localStorage.setItem(
        "tournament_id",
        generateForm.tournament_id
      );

      fetchMatches(generateForm.tournament_id);
    } catch (err) {
      alert(err.response?.data?.message || "Error generating bracket");
    }
  };

  const handleResultChange = (e) => {
    setResultForm({
      ...resultForm,
      [e.target.name]: e.target.value,
    });
  };

  const updateResult = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/matches/${resultForm.match_id}/result`, {
        team1_score: Number(resultForm.team1_score),
        team2_score: Number(resultForm.team2_score),
      });

      alert("Match result updated");

      if (tournamentId) {
        fetchMatches(tournamentId);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error updating result");
    }
  };

  return (
    <div>
      <h1>Matches / Bracket</h1>

      <h2>Load matches by tournament ID</h2>
      <form onSubmit={handleLoadMatches}>
        <input
          type="number"
          placeholder="Tournament ID"
          value={tournamentId}
          onChange={(e) => setTournamentId(e.target.value)}
        />
        <button type="submit">Load matches</button>
      </form>

      <h2>Generate bracket</h2>
      <form onSubmit={generateBracket}>
        <input
          name="tournament_id"
          type="number"
          placeholder="Tournament ID"
          value={generateForm.tournament_id}
          onChange={handleGenerateChange}
        />

        <input
          name="best_of"
          type="number"
          placeholder="Best of"
          value={generateForm.best_of}
          onChange={handleGenerateChange}
        />

        <button type="submit">Generate bracket</button>
      </form>

      <h2>Update match result</h2>
      <form onSubmit={updateResult}>
        <input
          name="match_id"
          type="number"
          placeholder="Match ID"
          value={resultForm.match_id}
          onChange={handleResultChange}
        />

        <input
          name="team1_score"
          type="number"
          placeholder="Team 1 score"
          value={resultForm.team1_score}
          onChange={handleResultChange}
        />

        <input
          name="team2_score"
          type="number"
          placeholder="Team 2 score"
          value={resultForm.team2_score}
          onChange={handleResultChange}
        />

        <button type="submit">Update result</button>
      </form>

      <h2>Matches</h2>

      {matches.length === 0 ? (
        <p>No matches found</p>
      ) : (
        matches.map((match) => (
          <div key={match.id}>
            <h3>
              Match #{match.id} | Round {match.round_number} | BO
              {match.best_of}
            </h3>

            <p>
              {match.team1_name || "TBD"} vs{" "}
              {match.team2_name || "TBD"}
            </p>

            <p>
              Score: {match.team1_score} : {match.team2_score}
            </p>

            <p>Status: {match.status}</p>
            <p>Winner: {match.winner_name || "Not decided"}</p>
            <p>Next match ID: {match.next_match_id || "None"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MatchesPage;