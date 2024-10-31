import { Navigate, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import { Welcome } from "../pages/Welcome/Welcome";
import News from "../pages/News/News";
import PlayerStats from "../pages/PlayerStats/PlayerStats";
import PlayerProfile from "../pages/PlayerStats/PlayerProfile";
import TeamList from "../pages/TeamStats/TeamList";
import TeamProfile from "../pages/TeamStats/TeamProfile";
import GameDetails from "../pages/GameDetails/GameDetails";
import GameList from "../pages/GameDetails/GameList";

export const ApplicationViews = () => {
  return (
    <Routes>
      {/* Unauthorized Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Register />} />

      {/* Authorized Routes */}
      <Route element={<Authorized />}>
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/players" element={<PlayerStats />} />
        <Route path="/players/:playerId" element={<PlayerProfile />} />
        <Route path="/teams" element={<TeamList />} />
        <Route path="/teams/:teamId" element={<TeamProfile />} />
        <Route path="/games/:gameId" element={<GameDetails />} />
        <Route path="/games" element={<GameList />} />
      </Route>

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
