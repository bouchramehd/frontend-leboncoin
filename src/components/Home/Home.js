import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [annonces, setAnnonces] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/annonces");
        setAnnonces(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des annonces");
      }
    };

    fetchAnnonces();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Annonces disponibles</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {annonces.map((annonce) => (
        <div key={annonce._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{annonce.title}</h3>
          <p>{annonce.description}</p>
          <p><strong>Prix:</strong> {annonce.price} €</p>
          <p><strong>Catégorie:</strong> {annonce.category}</p>
          <p><strong>Auteur:</strong> {annonce.author?.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
