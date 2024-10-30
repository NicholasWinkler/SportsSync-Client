import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../../api/gameApi";
import "./GameDetails.css";

export default function GameDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [game, setGame] = useState(null);
  const { gameId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!gameId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8000/api/games/${gameId}/details/`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setGame(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [gameId]);

  if (!gameId) return <div>No game ID provided</div>;
  if (isLoading) return <div>Loading game details for ID: {gameId}...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!game) return <div>No game found for ID: {gameId}</div>;

  return (
    <div className="game-details-container">
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  );
}
