import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchGames } from "../../api/gameApi";
import "./GameList.css";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchGames();
        if (data && data.data) {
          setGames(data.data);
        } else {
          setError("No games found");
        }
      } catch (err) {
        setError("Error fetching games");
      }
    };
    getGames();
  }, []);

  const formatLocalTime = (utcTime) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(utcTime).toLocaleTimeString([], options);
  };

  const groupGamesByDate = (games) => {
    return games.reduce((groups, game) => {
      const gameDate = new Date(game.date).toLocaleDateString();
      if (!groups[gameDate]) {
        groups[gameDate] = [];
      }
      groups[gameDate].push(game);
      return groups;
    }, {});
  };

  const groupedGames = groupGamesByDate(games);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!games.length) {
    return <p>Loading games...</p>;
  }

  return (
    <div className="game-list-container">
      <h2 className="game-list-title">Upcoming NBA Games</h2>
      {Object.keys(groupedGames).map((date) => (
        <div key={date} className="date-section">
          <h3 className="date-header">{date}</h3>
          <ul className="game-list">
            {groupedGames[date].map((game) => (
              <li key={game.id} className="game-item">
                <Link to={`/games/${game.id}`} className="game-link">
                  <div className="team-info">
                    <div className="team-label">
                      <span className="home-team-label">Home:</span>
                      <br />
                      <span className="home-team">
                        {game.home_team.full_name}
                      </span>
                    </div>
                    <span className="vs">vs</span>
                    <div className="team-label">
                      <span className="away-team-label">Away:</span>
                      <br />
                      <span className="away-team">
                        {game.visitor_team.full_name}
                      </span>
                    </div>
                  </div>
                  <div className="game-details">
                    <span className="game-time">
                      {formatLocalTime(game.date)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GameList;
