// src/components/FavoriteButton.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./FavoriteButton.css";

const FavoriteButton = ({ teamId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    checkFavoriteStatus();
  }, [teamId]);

  const checkFavoriteStatus = async () => {
    try {
      const token = localStorage.getItem("sportssync_token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/favorites/teams/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Checking favorites status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Current favorites:", data);
        setIsFavorite(data.favorite_teams.includes(teamId));
      } else {
        const errorData = await response.json();
        console.error("Error checking favorites:", errorData);
        setError(errorData.error || "Failed to check favorite status");
      }
    } catch (error) {
      console.error("Error in checkFavoriteStatus:", error);
      setError("Error checking favorite status");
    }
  };

  const toggleFavorite = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("sportssync_token");
      if (!token) {
        setError("Please log in to favorite teams");
        return;
      }

      if (isFavorite) {
        // Remove from favorites
        console.log(`Attempting to delete team ${teamId} from favorites`);
        const response = await fetch(
          `http://localhost:8000/api/favorites/teams/${teamId}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log("Delete response status:", response.status);

        if (response.status === 204) {
          console.log("Successfully removed from favorites");
          setIsFavorite(false);
          // Refresh on teams page after unfavoriting
          if (location.pathname === "/teams") {
            window.location.reload();
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error("Error removing favorite:", errorData);
          setError(errorData.error || "Failed to remove favorite");
        }
      } else {
        // Add to favorites
        console.log(`Attempting to add team ${teamId} to favorites`);
        const response = await fetch(
          "http://localhost:8000/api/favorites/teams/",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ team_id: teamId }),
          }
        );

        console.log("Add response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Add favorite response:", data);
          setIsFavorite(true);
          // Added refresh on teams page after favoriting
          if (location.pathname === "/teams") {
            window.location.reload();
          }
        } else {
          const errorData = await response.json();
          console.error("Error adding favorite:", errorData);
          setError(errorData.error || "Failed to add favorite");
        }
      }
    } catch (error) {
      console.error("Error in toggleFavorite:", error);
      setError("Error updating favorites");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="favorite-button-container">
      <button
        onClick={toggleFavorite}
        disabled={isLoading}
        className={`favorite-button ${isFavorite ? "favorite-active" : ""}`}
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <span>{isFavorite ? "★ Favorited" : "☆ Add to Favorites"}</span>
        )}
      </button>
      {error && <div className="favorite-error">{error}</div>}
    </div>
  );
};

export default FavoriteButton;
