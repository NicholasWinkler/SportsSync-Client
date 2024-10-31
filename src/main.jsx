import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import { ApplicationViews } from "./components/ApplicationViews"; // Adjust import path as necessary

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <NavBar /> {/* Navbar will be shown on all pages */}
      <ApplicationViews /> {/* Render application views here */}
    </Router>
  </React.StrictMode>
);
