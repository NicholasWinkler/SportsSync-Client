import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    fetch(`http://localhost:8000/register/`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        setLoading(false);
        console.log("Registration response:", authInfo); // Debug log

        if (authInfo && authInfo.token) {
          // Store just the token
          localStorage.setItem("sportssync_token", authInfo.token);
          console.log("Token stored:", authInfo.token); // Debug log
          navigate("/home");
        } else {
          setErrorMessage(
            authInfo.error || "Registration failed. Please try again."
          );
          existDialog.current.showModal();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Registration error:", error);
        setErrorMessage("Registration failed. Please try again.");
        existDialog.current.showModal();
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>{errorMessage || "Registration failed"}</div>
        <button
          className="button--close"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleRegister}>
          <h1 className="login-title">SportsSync</h1>
          <h2 className="login-subtitle">Register New Account</h2>
          <fieldset className="mb-4">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(evt) => setFirstName(evt.target.value)}
              className="form-control"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
              className="form-control"
              required
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputEmail">Email Address</label>
            <input
              type="email"
              id="inputEmail"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control"
              required
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control"
              required
            />
          </fieldset>
          <fieldset>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </fieldset>
        </form>
        <div className="loginLinks">
          <Link className="link--to-login" to="/login">
            Already have an account?
          </Link>
        </div>
      </section>
    </main>
  );
};
