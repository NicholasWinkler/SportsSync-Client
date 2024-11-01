import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { teamListApi } from "../../api/teamListApi";
import FavoriteButton from "../../components/FavoriteButton";
import FavoriteTeams from "../../components/FavoriteTeams";
import "./TeamList.css";

export const TeamList = () => {
  const [teams, setTeams] = useState({ east: [], west: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await teamListApi.getAllTeams();
        setTeams(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="loading">Loading teams...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="teams-container">
      <FavoriteTeams />

      <h1 className="teams-title">All NBA Teams</h1>

      <div className="conferences-container">
        {/* Eastern Conference */}
        <div className="conference">
          <h2 className="conference-title">Eastern Conference</h2>
          <div className="teams-grid">
            {teams.east.map((team) => (
              <div key={team.id} className="team-card">
                <Link to={`/teams/${team.id}`} className="team-card-content">
                  <img
                    src={team.logo}
                    alt={`Logo of ${team.name}`}
                    className="team-logo"
                  />
                  <h3 className="team-name">{team.name}</h3>
                  <div className="team-record">
                    <span>
                      {team.wins}-{team.losses}
                    </span>
                    <span className="streak">{team.streak}</span>
                  </div>
                  <div className="team-info">
                    <span>
                      #{team.conference_rank} in {team.conference}
                    </span>
                  </div>
                </Link>
                <FavoriteButton teamId={team.id} />
              </div>
            ))}
          </div>
        </div>

        {/* Western Conference */}
        <div className="conference">
          <h2 className="conference-title">Western Conference</h2>
          <div className="teams-grid">
            {teams.west.map((team) => (
              <div key={team.id} className="team-card">
                <Link to={`/teams/${team.id}`} className="team-card-content">
                  <img
                    src={team.logo}
                    alt={`Logo of ${team.name}`}
                    className="team-logo"
                  />
                  <h3 className="team-name">{team.name}</h3>
                  <div className="team-record">
                    <span>
                      {team.wins}-{team.losses}
                    </span>
                    <span className="streak">{team.streak}</span>
                  </div>
                  <div className="team-info">
                    <span>
                      #{team.conference_rank} in {team.conference}
                    </span>
                  </div>
                </Link>
                <FavoriteButton teamId={team.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamList;
