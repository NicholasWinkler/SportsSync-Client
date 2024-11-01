// src/components/FavoriteTeams.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FavoriteTeams.css";
import FavoriteButton from "./FavoriteButton";

const FavoriteTeams = () => {
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavoriteTeams();
  }, []);

  const fetchFavoriteTeams = async () => {
    try {
      const token = localStorage.getItem("sportssync_token");
      if (!token) {
        setError("Please log in to view favorites");
        setLoading(false);
        return;
      }

      // First, get the list of favorite team IDs
      const favResponse = await fetch(
        "http://localhost:8000/api/favorites/teams/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!favResponse.ok) {
        throw new Error("Failed to fetch favorites");
      }

      const favData = await favResponse.json();

      // Then, get all teams to find the details of favorited teams
      const teamsResponse = await fetch("http://localhost:8000/api/teams/");
      if (!teamsResponse.ok) {
        throw new Error("Failed to fetch team details");
      }

      const teamsData = await teamsResponse.json();

      // Combine east and west teams
      const allTeams = [...teamsData.east, ...teamsData.west];

      // Filter for only favorite teams
      const favoriteTeamDetails = allTeams.filter((team) =>
        favData.favorite_teams.includes(team.id)
      );

      setFavoriteTeams(favoriteTeamDetails);
    } catch (err) {
      console.error("Error fetching favorite teams:", err);
      setError("Failed to load favorite teams");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading favorite teams...</div>;
  if (error) return <div className="error">{error}</div>;
  if (favoriteTeams.length === 0) return <div>No favorite teams yet</div>;

  return (
    <div className="favorite-teams-section">
      <h2>Your Favorite Teams</h2>
      <div className="favorite-teams-grid">
        {favoriteTeams.map((team) => (
          <div key={team.id} className="favorite-team-card">
            <Link to={`/teams/${team.id}`} className="team-card-content">
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="team-logo"
              />
              <h3 className="team-name">{team.name}</h3>
              <div className="team-record">
                <span>
                  {team.wins}-{team.losses}
                </span>
                <span className="streak">{team.streak}</span>
              </div>
              <div className="team-info">
                <span>
                  #{team.conference_rank} in {team.conference}
                </span>
              </div>
            </Link>
            <FavoriteButton teamId={team.id} onToggle={fetchFavoriteTeams} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteTeams;
