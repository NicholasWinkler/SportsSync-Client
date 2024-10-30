import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import Home from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Welcome } from "./pages/Welcome/Welcome";
import News from "./pages/News/News";
import PlayerProfile from "./pages/PlayerStats/PlayerProfile";
import PlayerStats from "./pages/PlayerStats/PlayerStats";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <NavBar /> {/* Navbar will be shown on all pages */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<News />} />
        <Route path="/players" element={<PlayerStats />} />
        <Route path="/players/:playerId" element={<PlayerProfile />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
