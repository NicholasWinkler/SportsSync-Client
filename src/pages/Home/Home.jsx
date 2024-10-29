import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [homeData, setHomeData] = useState({
    games: {
      live_games: [],
      upcoming_games: [],
      recent_games: [],
    },
    player_of_week: null,
    standings: { east: [], west: [] },
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:8000/api/nba/home-data/"
        );
        const data = await response.json();
        setHomeData(data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-bold">SportsSync</span>
            <span className="logo-accent">Stats</span>
          </div>
          <nav className="nav-desktop">
            <a href="#games" className="nav-link">
              Games
            </a>
            <a href="#players" className="nav-link">
              Players
            </a>
            <a href="#teams" className="nav-link">
              Teams
            </a>
            <a href="#news" className="nav-link">
              News
            </a>
          </nav>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="menu-icon"></span>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="nav-mobile">
            <a href="#games" className="nav-link">
              Games
            </a>
            <a href="#players" className="nav-link">
              Players
            </a>
            <a href="#teams" className="nav-link">
              Teams
            </a>
            <a href="#news" className="nav-link">
              News
            </a>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Games Container */}
        <div className="games-container">
          {/* Live Games */}
          {homeData.games.live_games?.length > 0 && (
            <section className="live-games">
              <h2>Live Games</h2>
              <div className="games-grid">
                {homeData.games.live_games.map((game, index) => (
                  <div key={index} className="game-card live">
                    <div className="game-header">
                      <span className="game-status live">LIVE</span>
                      <span className="game-time">{game.time}</span>
                    </div>
                    <div className="game-content">
                      <div className="team home">
                        <span className="team-name">
                          {game.home_team.full_name}
                        </span>
                        <span className="team-record">
                          {game.home_team.record}
                        </span>
                        <span className="team-score">
                          {game.home_team.score}
                        </span>
                      </div>
                      <div className="vs">VS</div>
                      <div className="team away">
                        <span className="team-name">
                          {game.visitor_team.full_name}
                        </span>
                        <span className="team-record">
                          {game.visitor_team.record}
                        </span>
                        <span className="team-score">
                          {game.visitor_team.score}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Upcoming Games */}
          {homeData.games.upcoming_games?.length > 0 && (
            <section className="upcoming-games">
              <h2>Today's Games</h2>
              <div className="games-grid">
                {homeData.games.upcoming_games.map((game, index) => (
                  <div key={index} className="game-card">
                    <div className="game-header">
                      <span className="game-time">{game.time}</span>
                    </div>
                    <div className="game-content">
                      <div className="team home">
                        <span className="team-name">
                          {game.home_team.full_name}
                        </span>
                        <span className="team-record">
                          {game.home_team.record}
                        </span>
                      </div>
                      <div className="vs">VS</div>
                      <div className="team away">
                        <span className="team-name">
                          {game.visitor_team.full_name}
                        </span>
                        <span className="team-record">
                          {game.visitor_team.record}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recent Games */}
          {homeData.games.recent_games?.length > 0 && (
            <section className="recent-games">
              <h2>Recent Games</h2>
              <div className="games-grid">
                {homeData.games.recent_games.map((game, index) => (
                  <div key={index} className="game-card">
                    <div className="game-header">
                      <span className="game-status">Final</span>
                      <span className="game-time">{game.time}</span>
                    </div>
                    <div className="game-content">
                      <div className="team home">
                        <span className="team-name">
                          {game.home_team.full_name}
                        </span>
                        <span className="team-record">
                          {game.home_team.record}
                        </span>
                        <span className="team-score">
                          {game.home_team.score}
                        </span>
                      </div>
                      <div className="vs">VS</div>
                      <div className="team away">
                        <span className="team-name">
                          {game.visitor_team.full_name}
                        </span>
                        <span className="team-record">
                          {game.visitor_team.record}
                        </span>
                        <span className="team-score">
                          {game.visitor_team.score}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="stats-container">
          {/* Player of the Week */}
          {homeData.player_of_week && (
            <section className="player-of-week">
              <h2>Player of the Week</h2>
              <div className={`player-card ${isLoading ? "loading" : ""}`}>
                <h3>{homeData.player_of_week.name}</h3>
                <p className="team-name">{homeData.player_of_week.team}</p>
                <div className="stats-grid">
                  <div className="stat">
                    <span className="stat-value">
                      {homeData.player_of_week.stats.points}
                    </span>
                    <span className="stat-label">PPG</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">
                      {homeData.player_of_week.stats.rebounds}
                    </span>
                    <span className="stat-label">RPG</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">
                      {homeData.player_of_week.stats.assists}
                    </span>
                    <span className="stat-label">APG</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Standings */}
          <section className="standings">
            <h2>Current Standings</h2>
            <div className="standings-container">
              <div className="conference">
                <h3>Eastern Conference</h3>
                <div className="standings-list">
                  {homeData.standings.east.map((team, index) => (
                    <div key={index} className="standing-item">
                      <div className="standing-info">
                        <span className="standing-rank">{index + 1}</span>
                        <span className="team-name">{team.team}</span>
                      </div>
                      <div className="team-stats">
                        <span className="team-record">
                          {team.wins}-{team.losses}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="conference">
                <h3>Western Conference</h3>
                <div className="standings-list">
                  {homeData.standings.west.map((team, index) => (
                    <div key={index} className="standing-item">
                      <div className="standing-info">
                        <span className="standing-rank">{index + 1}</span>
                        <span className="team-name">{team.team}</span>
                      </div>
                      <div className="team-stats">
                        <span className="team-record">
                          {team.wins}-{team.losses}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
