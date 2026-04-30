import { useEffect, useState } from "react";
import api from "../api/api";

function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    max_teams: "",
  });

  const fetchTournaments = async () => {
    try {
      const res = await api.get("/tournaments");
      setTournaments(res.data.tournaments);
    } catch (err) {
      console.log(err);
      alert("Failed to load tournaments");
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tournaments", {
        title: form.title,
        description: form.description,
        max_teams: Number(form.max_teams),
      });

      alert("Tournament created");

      setForm({
        title: "",
        description: "",
        max_teams: "",
      });

      fetchTournaments();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating tournament");
    }
  };

  return (
    <div>
      <h1>Tournaments</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Tournament title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="max_teams"
          type="number"
          placeholder="Max teams"
          value={form.max_teams}
          onChange={handleChange}
        />

        <button type="submit">Create tournament</button>
      </form>

      <h2>All tournaments</h2>

      {tournaments.length === 0 ? (
        <p>No tournaments found</p>
      ) : (
        tournaments.map((tournament) => (
          <div key={tournament.id}>
            <h3>{tournament.title}</h3>
            <p>{tournament.description}</p>
            <p>Max teams: {tournament.max_teams}</p>
            <p>Status: {tournament.status}</p>
            <p>Creator: {tournament.creator}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default TournamentsPage;