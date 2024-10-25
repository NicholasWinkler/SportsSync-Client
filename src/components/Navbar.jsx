import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SportsSyncLogo from "../assets/images/SportsSyncLogo.png";

export const NavBar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sportssync_token");
    navigate("/login");
  };

  return (
    <ul className="navbar">
      <li className="navbar__item navbar__logo">
        <NavLink to={isAuthenticated ? "/home" : "/"}>
          <img src={SportsSyncLogo} alt="SportsSync" className="logo-image" />
        </NavLink>
      </li>

      <div className="navbar__menu">
        {isAuthenticated ? (
          <>
            <li className="navbar__item">
              <NavLink to="/players" className="nav-link">
                Players
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to="/teams" className="nav-link">
                Teams
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to="/games" className="nav-link">
                Games
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to="/news" className="nav-link">
                News
              </NavLink>
            </li>
            <li className="navbar__item">
              <button onClick={handleLogout} className="nav-link logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <div className="navbar__auth-links">
            <li className="navbar__item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          </div>
        )}
      </div>
    </ul>
  );
};
