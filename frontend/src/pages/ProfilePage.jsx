import { useEffect, useState } from "react";
import api from "../api/api";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await api.get("/auth/profile");
        setUser(profileRes.data.user);

        const walletRes = await api.get("/wallet");
        setWallet(walletRes.data.wallet);

        const txRes = await api.get("/wallet/transactions");
        setTransactions(txRes.data.transactions);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>

      <h2>User</h2>
      <p>ID: {user.id}</p>
      <p>Role: {user.role_id}</p>

      <h2>Wallet</h2>
      {wallet ? (
        <p>Balance: {wallet.balance}</p>
      ) : (
        <p>No wallet found</p>
      )}

      <h2>Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions</p>
      ) : (
        transactions.map((tx) => (
          <div key={tx.id}>
            <p>Type: {tx.type}</p>
            <p>Amount: {tx.amount}</p>
            <p>Description: {tx.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProfilePage;