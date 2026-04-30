import { useState } from "react";
import api from "../api/api";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      // ВАЖНО
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data?.message || "Error");
      }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" onChange={handleChange} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;