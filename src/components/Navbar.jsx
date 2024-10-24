import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SportsSyncLogo from "../assets/images/SportsSyncLogo.png";

export const NavBar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <ul className="navbar pb-10">
      <li className="navbar__item navbar__logo">
        <NavLink to="/">
          <img src={SportsSyncLogo} alt="SportsSync" className="logo-image" />
        </NavLink>
      </li>
      <li className="navbar__item pl-10">
        <NavLink
          className="text-left underline text-blue-600 hover:text-purple-700"
          to={"/allrocks"}
        >
          Placeholder
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink
          className="text-left underline text-blue-600 hover:text-purple-700"
          to={"/create"}
        >
          Placeholder
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink
          className="text-left underline text-blue-600 hover:text-purple-700"
          to={"/mine"}
        >
          Placeholder
        </NavLink>
      </li>
      {localStorage.getItem("sportssync_token") !== null ? (
        <li className="navbar__item">
          <button
            className="underline text-blue-600 hover:text-purple-700"
            onClick={() => {
              localStorage.removeItem("rock_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
