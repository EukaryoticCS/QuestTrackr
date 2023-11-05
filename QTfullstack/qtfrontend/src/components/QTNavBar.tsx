import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link } from "react-router-dom";
import QTLogo from "../QT.svg";

interface Props {
  username: string;
}

function QTNavBar({ username }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logInHandler = () => {
    setLoggedIn(true)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          <img alt="" src={QTLogo} height="60" width="80" className="mx-2" />
          QuestTrackr
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item mx-4">
              <form className="d-flex">
                <input
                  className="form-control mx-sm-2"
                  type="search"
                  placeholder="Search"
                />
              </form>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                FAQ
              </Link>
              {/* Should FAQ even go here? */}
            </li>
          </ul>
          <div className="nav navbar-nav ml-auto">
            {loggedIn ? (
              <div className="nav-item">
                <Link className="nav-link" to="#">
                  {username}
                  <img
                    alt=""
                    src={QTLogo}
                    height="50"
                    width="50"
                    className="mx-2"
                  />
                </Link>
              </div>
            ) : (
              <div className="dropdown dropstart">
                <button className="btn btn-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                  Login
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <form className="px-4 py-3">
                    <div className="form-group">
                      <label htmlFor="exampleDropdownFormEmail1">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleDropdownFormEmail1"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleDropdownFormPassword1">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleDropdownFormPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="dropdownCheck"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="dropdownCheck"
                      >
                        Remember me
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={logInHandler}>
                      Sign in
                    </button>
                  </form>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#">
                    New around here? Sign up
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Forgot password?
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default QTNavBar;
