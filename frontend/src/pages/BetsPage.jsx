import { useEffect, useState } from "react";
import api from "../api/api";

function BetsPage() {
  const [bets, setBets] = useState([]);

  const [form, setForm] = useState({
    match_id: "",
    team_id: "",
    amount: "",
  });

  const fetchBets = async () => {
    try {
      const res = await api.get("/bets/my");
      setBets(res.data.bets);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load bets");
    }
  };

  useEffect(() => {
    fetchBets();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createBet = async (e) => {
    e.preventDefault();

    try {
      await api.post("/bets", {
        match_id: Number(form.match_id),
        team_id: Number(form.team_id),
        amount: Number(form.amount),
      });

      alert("Bet placed");

      setForm({
        match_id: "",
        team_id: "",
        amount: "",
      });

      fetchBets();
    } catch (err) {
      alert(err.response?.data?.message || "Error placing bet");
    }
  };

  return (
    <div>
      <h1>Bets</h1>

      <h2>Place bet</h2>
      <form onSubmit={createBet}>
        <input
          name="match_id"
          type="number"
          placeholder="Match ID"
          value={form.match_id}
          onChange={handleChange}
        />

        <input
          name="team_id"
          type="number"
          placeholder="Team ID"
          value={form.team_id}
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <button type="submit">Place bet</button>
      </form>

      <h2>My bets</h2>

      {bets.length === 0 ? (
        <p>No bets found</p>
      ) : (
        bets.map((bet) => (
          <div key={bet.id}>
            <h3>Bet #{bet.id}</h3>
            <p>Match ID: {bet.match_id}</p>
            <p>Team: {bet.team_name}</p>
            <p>Amount: {bet.amount}</p>
            <p>Coefficient: {bet.coefficient}</p>
            <p>Potential win: {bet.potential_win}</p>
            <p>Status: {bet.status}</p>
            <p>Match status: {bet.match_status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BetsPage;