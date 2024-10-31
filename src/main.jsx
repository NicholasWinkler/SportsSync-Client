// src/main.jsx
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
import TeamList from "./pages/TeamStats/TeamList"; // Import the TeamList component
import TeamProfile from "./pages/TeamStats/TeamProfile"; // Import the TeamProfile component
import GameDetails from "./pages/GameDetails/GameDetails";
import GameList from "./pages/GameDetails/GameList";

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
        <Route path="/teams" element={<TeamList />} />{" "}
        {/* Add route for Team List */}
        <Route path="/teams/:teamId" element={<TeamProfile />} />
        {/* Add route for Team Profile */}
        <Route path="/games/:gameId" element={<GameDetails />} />
        <Route path="/games" element={<GameList />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
