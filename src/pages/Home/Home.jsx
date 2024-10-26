import React, { useState, useEffect } from "react";
import "./Home.css"; // Import your CSS styles

const Home = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [featuredGames, setFeaturedGames] = useState([]);

  useEffect(() => {
    fetchStandings();
    fetchFeaturedGames();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchStandings = async () => {
    try {
      const response = await fetch("/api/standings/");
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setStandings(data);
    } catch (error) {
      console.error("Error fetching standings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedGames = async () => {
    try {
      const response = await fetch("/api/featuredGames/");
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setFeaturedGames(data);
    } catch (error) {
      console.error("Error fetching featured games:", error);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`/api/search/?q=${searchQuery}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...standings].sort((a, b) => {
      if (direction === "ascending") {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
    setStandings(sortedData);
  };

  return (
    <div className="dashboard-container">
      <div className="search-container">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search players, teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result) => (
              <div key={result.id} className="search-result-item">
                <span>{result.name}</span>
                <span className="result-type">{result.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">🏆 Featured Games</h2>
        </div>
        <div className="card-content featured-games">
          {featuredGames.map((game) => (
            <div key={game.id} className="game-card">
              <div className="game-header">
                <span className="team-names">
                  {game.homeTeam} vs {game.awayTeam}
                </span>
                <span className="game-time">{game.time}</span>
              </div>
              <div className="game-date">{game.date}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">🌟 Player of the Week</h2>
        </div>
        <div className="card-content">
          <div className="player-card">
            <div className="player-image">
              <img src="/api/placeholder/96/96" alt="Player" />
            </div>
            <div className="player-info">
              <h3 className="player-name">LeBron James</h3>
              <p className="player-team">Los Angeles Lakers</p>
              <div className="player-stats">
                <div className="stat-item">
                  <div className="stat-label">PPG</div>
                  <div className="stat-value">28.5</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">RPG</div>
                  <div className="stat-value">8.2</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">APG</div>
                  <div className="stat-value">7.5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">📈 Current Standings</h2>
        </div>
        <div className="card-content">
          {loading ? (
            <div className="loading">Loading standings...</div>
          ) : (
            <div className="standings-table">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("rank")}>Rank</th>
                    <th onClick={() => handleSort("team")}>Team</th>
                    <th onClick={() => handleSort("wins")}>W</th>
                    <th onClick={() => handleSort("losses")}>L</th>
                    <th onClick={() => handleSort("pct")}>PCT</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team, index) => (
                    <tr key={team.id}>
                      <td>{index + 1}</td>
                      <td>{team.team}</td>
                      <td>{team.wins}</td>
                      <td>{team.losses}</td>
                      <td>
                        {(team.wins / (team.wins + team.losses)).toFixed(3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
