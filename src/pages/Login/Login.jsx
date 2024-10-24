import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file for styles

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Fetch call to login
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        setLoading(false);
        if (authInfo.valid) {
          localStorage.setItem("sportssync_token", JSON.stringify(authInfo));
          navigate("/");
        } else {
          setErrorMessage("Incorrect email or password.");
          existDialog.current.showModal();
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("Server error, please try again later.");
        existDialog.current.showModal();
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>{errorMessage}</div>
        <button
          className="button--close"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section className="form--login">
        <div className="card">
          <h1 className="login-title">SportsSync</h1>
          <h2>Please sign in</h2>

          <form onSubmit={handleLogin}>
            <fieldset>
              <label htmlFor="inputEmail"> Email address </label>
              <input
                type="email"
                id="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoComplete="email"
              />
            </fieldset>

            <fieldset>
              <label htmlFor="inputPassword"> Password </label>
              <input
                type="password"
                id="inputPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                autoComplete="current-password"
              />
            </fieldset>

            <fieldset>
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </fieldset>
          </form>

          <section className="link--register">
            <Link to="/register">Not a member yet?</Link>
          </section>
        </div>
      </section>
    </main>
  );
};
