import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAnnonce = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/annonces", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage("Annonce créée avec succès !");
      setTimeout(() => navigate("/"), 1000); // Redirection après 1s
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur lors de la création");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Créer une annonce</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={formData.title}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={formData.price}
          onChange={handleChange}
          required
        /><br /><br />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Choisir une catégorie</option>
          <option value="Électronique">Électronique</option>
          <option value="Maison">Maison</option>
          <option value="Véhicules">Véhicules</option>
          <option value="Loisirs">Loisirs</option>
        </select><br /><br />

        <button type="submit">Créer</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default CreateAnnonce;
