import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">S'inscrire</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
