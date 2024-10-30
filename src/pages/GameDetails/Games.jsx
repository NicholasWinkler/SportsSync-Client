import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGames } from "../../api/gameApi";
import "./Games.css";

export default function Games() {
  const [gamesData, setGamesData] = useState({
    live_games: [],
    upcoming_games: [],
    recent_games: [],
  });
  const [selectedDate, setSelectedDate] = useState("today");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const data = await getGames(selectedDate);
        setGamesData(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
    const interval = setInterval(fetchGames, 60000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  if (isLoading) return <div>Loading games...</div>;

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>NBA Schedule</h1>
        <div className="schedule-filters">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="yesterday">Yesterday</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
          </select>
        </div>
      </div>

      <div className="games-table">
        <table>
          <thead>
            <tr>
              <th>TIME (ET)</th>
              <th>MATCHUP</th>
              <th>LOCATION</th>
            </tr>
          </thead>
          <tbody>
            {[...gamesData.live_games, ...gamesData.upcoming_games].map(
              (game) => (
                <tr key={game.id} className="game-row">
                  <td className="time-cell">{game.time}</td>
                  <td className="matchup-cell">
                    <Link to={`/games/${game.id}`} className="team-link">
                      <div className="team">
                        {game.home_team.full_name}
                        <span className="record">{game.home_team.record}</span>
                        {game.status === "live" && (
                          <span className="score">{game.home_team.score}</span>
                        )}
                      </div>
                      <div className="team">
                        {game.visitor_team.full_name}
                        <span className="record">
                          {game.visitor_team.record}
                        </span>
                        {game.status === "live" && (
                          <span className="score">
                            {game.visitor_team.score}
                          </span>
                        )}
                      </div>
                    </Link>
                  </td>
                  <td className="location-cell">{game.arena}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {gamesData.recent_games.length > 0 && (
        <div className="completed-games">
          <h2>Completed Games</h2>
          <table>
            <thead>
              <tr>
                <th>FINAL</th>
                <th>MATCHUP</th>
                <th>STATS LEADERS</th>
              </tr>
            </thead>
            <tbody>
              {gamesData.recent_games.map((game) => (
                <tr key={game.id} className="game-row">
                  <td className="score-cell">
                    {game.home_team.score} - {game.visitor_team.score}
                  </td>
                  <td className="matchup-cell">
                    <Link to={`/games/${game.id}`} className="team-link">
                      <div className="team">
                        {game.home_team.full_name}
                        <span className="record">{game.home_team.record}</span>
                      </div>
                      <div className="team">
                        {game.visitor_team.full_name}
                        <span className="record">
                          {game.visitor_team.record}
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td className="stats-cell">
                    {/* Add stats leaders here if available */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
