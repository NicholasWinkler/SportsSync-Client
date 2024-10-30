import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PlayerStats.css";

export default function PlayerStats() {
  // Changed to default export
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/players/");
        if (!response.ok) throw new Error("Failed to fetch players");
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.player_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) return <div className="error-message">Error: {error}</div>;
  if (loading) return <div className="loading-message">Loading...</div>;

  return (
    <div className="players-container">
      <div className="players-header">
        <h1 className="players-title">NBA Players</h1>
        <input
          type="text"
          placeholder="Search players..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="players-grid">
        {filteredPlayers.map((player) => (
          <div key={player.player_id} className="player-card">
            <div className="player-card-header">
              <h2 className="player-name">{player.player_name}</h2>
              <p className="team-name">{player.team_abbreviation}</p>
            </div>
            <div className="player-stats-grid">
              <div className="stat-item">
                <p className="stat-label">PTS</p>
                <p className="stat-value">
                  {(player.pts / player.gp).toFixed(1)}
                </p>
              </div>
              <div className="stat-item">
                <p className="stat-label">REB</p>
                <p className="stat-value">
                  {(player.reb / player.gp).toFixed(1)}
                </p>
              </div>
              <div className="stat-item">
                <p className="stat-label">AST</p>
                <p className="stat-value">
                  {(player.ast / player.gp).toFixed(1)}
                </p>
              </div>
              <div className="stat-item">
                <p className="stat-label">MPG</p>
                <p className="stat-value">
                  {(player.min / player.gp).toFixed(1)}
                </p>
              </div>
            </div>
            <div className="player-footer">
              <div className="games-played">
                GP: {player.gp} | {player.w}-{player.l}
              </div>
              <Link
                to={`/players/${player.player_id}`}
                className="view-profile-button"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
