import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import SportsSyncWelcomeImg from "../../assets/images/SportsSyncWelcomeImg.png"; // Updated path

export const Welcome = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img
          className="welcome-image"
          src={SportsSyncWelcomeImg}
          alt="Welcome image"
        />
      </div>
      <h1 className="title-text">SportsSync</h1>
      <p className="description-text">
        Welcome to SportsSync! Explore NBA teams, players, and more!
      </p>
      <Link to="/register">
        <button className="button">Register</button>
      </Link>
      <Link to="/login">
        <button className="button">Get Started</button>
      </Link>
    </div>
  );
};
