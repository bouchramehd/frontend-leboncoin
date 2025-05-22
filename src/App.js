import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CreateAnnonce from "./components/CreateAnnonce/CreateAnnonce";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Le Bon Coin - MERN</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Accueil</Link> |{" "}
          <Link to="/register">S'inscrire</Link> |{" "}
          <Link to="/login">Se connecter</Link> |{" "}
          <Link to="/create">Déposer une annonce</Link> |{" "}
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Déconnexion
          </button>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateAnnonce />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
