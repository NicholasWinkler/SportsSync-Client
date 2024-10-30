// PlayerProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PlayerProfile.css";

const PlayerProfile = () => {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/players/${playerId}/`
        );
        if (!response.ok) throw new Error("Failed to fetch player data");
        const data = await response.json();
        setPlayerData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  if (error) return <div>Error fetching player data: {error}</div>;
  if (!playerData) return <div>Loading...</div>;

  return (
    <div className="player-profile">
      <Link to="/players" className="back-button">
        ← Back to Players
      </Link>

      <div className="player-header">
        <h1 className="player-name">{playerData.player_name}</h1>
        <div className="team-info">
          <div className="team-abbreviation">
            {playerData.team_abbreviation}
          </div>
          <div className="record">
            {playerData.w}-{playerData.l} ({(playerData.w_pct * 100).toFixed(1)}
            %)
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>Season Scoring</h2>
          <div className="stat-row">
            <span className="stat-label">Points</span>
            <span className="stat-value highlight-stat">{playerData.pts}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Minutes</span>
            <span className="stat-value">{playerData.min.toFixed(1)}</span>
          </div>
          <div className="shooting-splits">
            <div className="split-stat">
              <div className="split-value">
                {(playerData.fg_pct * 100).toFixed(1)}%
              </div>
              <div className="split-label">
                FG% ({playerData.fgm}/{playerData.fga})
              </div>
            </div>
            <div className="split-stat">
              <div className="split-value">
                {(playerData.fg3_pct * 100).toFixed(1)}%
              </div>
              <div className="split-label">
                3P% ({playerData.fg3m}/{playerData.fg3a})
              </div>
            </div>
            <div className="split-stat">
              <div className="split-value">
                {(playerData.ft_pct * 100).toFixed(1)}%
              </div>
              <div className="split-label">
                FT% ({playerData.ftm}/{playerData.fta})
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <h2>Season Performance</h2>
          <div className="stat-row">
            <span className="stat-label">Rebounds</span>
            <span className="stat-value">{playerData.reb}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Assists</span>
            <span className="stat-value">{playerData.ast}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Steals</span>
            <span className="stat-value">{playerData.stl}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Blocks</span>
            <span className="stat-value">{playerData.blk}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Turnovers</span>
            <span className="stat-value">{playerData.tov}</span>
          </div>
        </div>

        <div className="stat-card">
          <h2>Additional Stats</h2>
          <div className="stat-row">
            <span className="stat-label">Games Played</span>
            <span className="stat-value">{playerData.gp}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Plus/Minus</span>
            <span className="stat-value">{playerData.plus_minus}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
