import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./GameDetails.css";

const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:8000/api/games/${gameId}/details/`
        );
        if (!response.ok) {
          throw new Error("Game not found");
        }
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGameDetails();
      // Refresh data every 30 seconds for live games
      const interval = setInterval(() => {
        if (gameData?.status?.is_live) {
          fetchGameDetails();
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [gameId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading game details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Game</h2>
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  if (!gameData) return null;

  const getStatusDisplay = () => {
    const { status } = gameData;
    if (!status.has_started) {
      return (
        <div className="game-status scheduled">
          <span className="status-text">{status.message}</span>
          {status.countdown && (
            <span className="countdown">
              Starting in: {status.countdown.hours}h {status.countdown.minutes}m
            </span>
          )}
        </div>
      );
    }
    if (status.is_live) {
      return (
        <div className="game-status live">
          <span className="status-indicator"></span>
          <span className="status-text">LIVE</span>
          <span className="game-clock">{status.message}</span>
        </div>
      );
    }
    return (
      <div className="game-status final">
        <span className="status-text">Final</span>
      </div>
    );
  };

  return (
    <div className="game-details-page">
      <div className="game-details-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      </div>

      <div className="game-details-container">
        {/* Game Status Section */}
        <div className="status-section">
          {getStatusDisplay()}
          <div className="venue-info">
            {gameData.arena && <span className="arena">{gameData.arena}</span>}
            {gameData.scheduled_time && (
              <span className="time">{gameData.scheduled_time}</span>
            )}
          </div>
        </div>

        {/* Teams and Score Section */}
        <div className="teams-section">
          <div className="team home">
            <h2 className="team-name">{gameData.home_team.full_name}</h2>
            <div className="record">{gameData.home_team.record}</div>
            <div className="score">{gameData.home_team.score}</div>
          </div>

          <div className="game-divider">
            <span className="vs">VS</span>
          </div>

          <div className="team away">
            <h2 className="team-name">{gameData.visitor_team.full_name}</h2>
            <div className="record">{gameData.visitor_team.record}</div>
            <div className="score">{gameData.visitor_team.score}</div>
          </div>
        </div>

        {/* Team Stats Section - Only show if game has started */}
        {gameData.status.has_started && (
          <div className="stats-section">
            <h3>Team Stats</h3>
            <div className="stats-grid">
              <div className="stat-row">
                <div className="stat-value">
                  {gameData.home_team.stats?.fg_pct.toFixed(1)}%
                </div>
                <div className="stat-label">FG%</div>
                <div className="stat-value">
                  {gameData.visitor_team.stats?.fg_pct.toFixed(1)}%
                </div>
              </div>
              <div className="stat-row">
                <div className="stat-value">
                  {gameData.home_team.stats?.fg3_pct.toFixed(1)}%
                </div>
                <div className="stat-label">3PT%</div>
                <div className="stat-value">
                  {gameData.visitor_team.stats?.fg3_pct.toFixed(1)}%
                </div>
              </div>
              <div className="stat-row">
                <div className="stat-value">
                  {gameData.home_team.stats?.ft_pct.toFixed(1)}%
                </div>
                <div className="stat-label">FT%</div>
                <div className="stat-value">
                  {gameData.visitor_team.stats?.ft_pct.toFixed(1)}%
                </div>
              </div>
              <div className="stat-row">
                <div className="stat-value">
                  {gameData.home_team.stats?.rebounds}
                </div>
                <div className="stat-label">Rebounds</div>
                <div className="stat-value">
                  {gameData.visitor_team.stats?.rebounds}
                </div>
              </div>
              <div className="stat-row">
                <div className="stat-value">
                  {gameData.home_team.stats?.assists}
                </div>
                <div className="stat-label">Assists</div>
                <div className="stat-value">
                  {gameData.visitor_team.stats?.assists}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Broadcast Info - Show for upcoming games */}
        {!gameData.status.has_started && gameData.broadcast && (
          <div className="broadcast-section">
            <h3>Broadcast Information</h3>
            <div className="broadcast-info">
              {gameData.broadcast.join(", ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetails;
