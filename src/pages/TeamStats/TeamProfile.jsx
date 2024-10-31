import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { teamListApi } from "../../api/teamListApi";
import "./TeamProfile.css";

export const TeamProfile = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { teamId } = useParams();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamListApi.getTeamById(teamId);
        setTeam(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load team details");
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  if (loading) return <div className="loading">Loading team profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!team) return <div className="error">Team not found</div>;

  // Calculate the win percentage with accurate rounding
  const gamesPlayed = team.wins + team.losses;
  const winPercentage =
    gamesPlayed > 0 ? ((team.wins / gamesPlayed) * 100).toFixed(1) : "0.0";

  // Sort players by minutes played
  const sortedRoster = team.roster.sort(
    (a, b) => b.stats.minutes - a.stats.minutes
  );

  return (
    <div className="team-profile">
      <Link to="/teams" className="back-button">
        ← Back to Teams
      </Link>

      <div className="team-header">
        <img src={team.logo} alt={team.name} className="team-logo-large" />
        <div className="team-info">
          <h1>{team.name}</h1>
          <div className="team-stats">
            <div className="stat-box">
              <span className="stat-value">
                {team.wins}-{team.losses}
              </span>
              <span className="stat-label">Record</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{winPercentage}%</span>
              <span className="stat-label">Win %</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{team.streak}</span>
              <span className="stat-label">Streak</span>
            </div>
          </div>
        </div>
      </div>

      <div className="roster-section">
        <h2>Team Roster</h2>
        <div className="roster-table-container">
          <table className="roster-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>GP</th>
                <th>MIN</th>
                <th>PTS</th>
                <th>REB</th>
                <th>AST</th>
                <th>FG%</th>
                <th>3P%</th>
                <th>FT%</th>
              </tr>
            </thead>
            <tbody>
              {sortedRoster.map((player) => (
                <tr key={player.id}>
                  <td className="player-name">
                    <Link to={`/players/${player.id}`}>{player.name}</Link>
                  </td>
                  <td>{player.stats.games_played}</td>
                  <td>{player.stats.minutes}</td>
                  <td>{player.stats.points}</td>
                  <td>{player.stats.rebounds}</td>
                  <td>{player.stats.assists}</td>
                  <td>{player.stats.field_goal_percentage}</td>
                  <td>{player.stats.three_point_percentage}</td>
                  <td>{player.stats.free_throw_percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;
