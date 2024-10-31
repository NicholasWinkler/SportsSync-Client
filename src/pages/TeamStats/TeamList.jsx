import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { teamListApi } from "../../api/teamListApi";
import "./TeamList.css";

export const TeamList = () => {
  const [teams, setTeams] = useState({ east: [], west: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await teamListApi.getAllTeams();
        // Assuming data is structured with east and west teams
        setTeams(data);
      } catch (err) {
        console.error(err); // Log the error for debugging
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
      <h1 className="teams-title">NBA Teams</h1>

      <div className="conferences-container">
        <div className="conference">
          <h2 className="conference-title">Eastern Conference</h2>
          <div className="teams-grid">
            {teams.east.map((team) => (
              <Link
                to={`/teams/${team.id}`}
                key={team.id}
                className="team-card"
              >
                <div className="team-card-content">
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
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="conference">
          <h2 className="conference-title">Western Conference</h2>
          <div className="teams-grid">
            {teams.west.map((team) => (
              <Link
                to={`/teams/${team.id}`}
                key={team.id}
                className="team-card"
              >
                <div className="team-card-content">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamList;
