import { useState } from "react";
import api from "../api/api";

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
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
    await api.post("/auth/register", form);

    // сразу логинимся
    const res = await api.post("/auth/login", {
      email: form.email,
      password: form.password,
    });

    localStorage.setItem("token", res.data.token);

    // редирект
    window.location.href = "/dashboard";

  } catch (err) {
    if (err.response?.data?.errors) {
      const errors = err.response.data.errors
        .map((e) => e.msg)
        .join("\n");
      alert(errors);
    } else {
      alert(err.response?.data?.message || "Error");
    }
  }
};

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" onChange={handleChange} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;