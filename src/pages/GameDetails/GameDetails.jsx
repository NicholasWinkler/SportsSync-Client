import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameDetails as fetchGameDetailsApi } from "../../api/gameApi";
import "./GameDetails.css";

function GameDetails() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      // Renamed local function
      setLoading(true);
      try {
        const data = await fetchGameDetailsApi(gameId); // Use the renamed import
        setGameDetails(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails(); // Call the renamed local function
  }, [gameId]);

  if (loading) return <p>Loading game details...</p>;
  if (!gameDetails) {
    return (
      <div className="game-not-available">
        <p>Game details not available until the game starts.</p>
      </div>
    );
  }

  const gameStarted = gameDetails.status !== "Scheduled";

  const formatLocalTime = (utcTime) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(utcTime).toLocaleTimeString([], options);
  };

  return (
    <div className="game-details">
      <h2>Game Details</h2>
      <div className="game-info">
        <p>
          <strong>Home Team:</strong> {gameDetails.home_team.full_name}
        </p>
        <p>
          <strong>Away Team:</strong> {gameDetails.visitor_team.full_name}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(gameDetails.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong> {formatLocalTime(gameDetails.date)}
        </p>
        {gameStarted ? (
          <p>
            <strong>Status:</strong> {gameDetails.status}
          </p>
        ) : (
          <p>The game has not started yet.</p>
        )}
      </div>

      {/* Additional details like box scores */}
      <div className="box-scores">
        <h3>Box Scores</h3>
        {gameStarted ? (
          <div>
            <p>
              <strong>Home Team Score:</strong> {gameDetails.home_team_score}
            </p>
            <p>
              <strong>Away Team Score:</strong> {gameDetails.visitor_team_score}
            </p>
            <p>
              <strong>Quarter:</strong> {gameDetails.period}
            </p>
            <p>
              <strong>Time Left:</strong> {gameDetails.time}
            </p>
          </div>
        ) : (
          <p>Box scores will be available once the game starts.</p>
        )}
      </div>
    </div>
  );
}

export default GameDetails;
