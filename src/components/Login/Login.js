import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token } = res.data;

      localStorage.setItem("token", token); // 🔐 sauvegarder le token
      setMessage("Connexion réussie !");
      navigate("/"); // aller vers home
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Se connecter</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
