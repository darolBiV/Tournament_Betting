import { useEffect, useState } from "react";
import api from "../api/api";

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [joinForm, setJoinForm] = useState({
    tournament_id: "",
    team_id: "",
  });

  const fetchTeams = async () => {
    try {
      const res = await api.get("/teams");
      setTeams(res.data.teams);
    } catch (err) {
      alert("Failed to load teams");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleJoinChange = (e) => {
    setJoinForm({
      ...joinForm,
      [e.target.name]: e.target.value,
    });
  };

  const createTeam = async (e) => {
    e.preventDefault();

    try {
      await api.post("/teams", form);
      alert("Team created");

      setForm({
        name: "",
        description: "",
      });

      fetchTeams();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating team");
    }
  };

  const joinTournament = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tournament-teams", {
        tournament_id: Number(joinForm.tournament_id),
        team_id: Number(joinForm.team_id),
      });

      alert("Team joined tournament");
    } catch (err) {
      alert(err.response?.data?.message || "Error joining tournament");
    }
  };

  return (
    <div>
      <h1>Teams</h1>

      <h2>Create team</h2>
      <form onSubmit={createTeam}>
        <input
          name="name"
          placeholder="Team name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">Create team</button>
      </form>

      <h2>Join team to tournament</h2>
      <form onSubmit={joinTournament}>
        <input
          name="tournament_id"
          type="number"
          placeholder="Tournament ID"
          value={joinForm.tournament_id}
          onChange={handleJoinChange}
        />

        <input
          name="team_id"
          type="number"
          placeholder="Team ID"
          value={joinForm.team_id}
          onChange={handleJoinChange}
        />

        <button type="submit">Join tournament</button>
      </form>

      <h2>All teams</h2>

      {teams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        teams.map((team) => (
          <div key={team.id}>
            <h3>
              #{team.id} {team.name}
            </h3>
            <p>{team.description}</p>
            <p>Captain: {team.captain}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default TeamsPage;