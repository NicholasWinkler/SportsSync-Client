import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Ensure you have the correct path for your CSS file
import SportsSyncLogo from "../assets/images/SportsSyncLogo.png"; // Adjust the path if necessary

export const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("sportssync_token"); // Get the token here

  const handleLogout = () => {
    localStorage.removeItem("sportssync_token");
    navigate("/");
  };

  return (
    <ul className="navbar">
      <li className="navbar__item navbar__logo">
        <NavLink to={token ? "/home" : "/"}>
          <img src={SportsSyncLogo} alt="SportsSync" className="logo-image" />
        </NavLink>
      </li>

      <div className="navbar__menu">
        {token ? ( // Use token check here
          // Authorized Navigation Links
          <>
            <li className="navbar__item">
              <NavLink to="/home" className="nav-link">
                Dashboard
              </NavLink>
            </li>
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
          // Unauthorized Navigation Links
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
