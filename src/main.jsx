import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import Home from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <NavBar /> {/* Navbar will be shown on all pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/register" element={<Register />} /> {/* Register page */}
      </Routes>
    </Router>
  </React.StrictMode>
);
