import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as QTLogo } from "../assets/svg/QT.svg";
import Session from "supertokens-auth-react/recipe/session";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { doesSessionExist } from "supertokens-auth-react/recipe/session";
import axios from "axios";
import { config } from "../constants";

function QTNavBar({ handleInputChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({username: "", profile: {profilePicture: ""}});
  const sessionContext = useSessionContext();

  useEffect(() => {
    async function checkIfLoggedIn() {
      const userIsLoggedIn = await doesSessionExist();
      setIsLoggedIn(userIsLoggedIn);

      if (userIsLoggedIn) {
        const userId = await Session.getUserId();
        const response = await axios.get(
          `${config.backend}/api/v1/users/supertokens/${userId}`
        );
        setUser(response.data);
      }
    }
    checkIfLoggedIn();
  }, [sessionContext]);

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <QTLogo height="60" width="80" className="mx-2" />
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
            <li className="nav-item mx-3 col-9">
                <input
                  className="form-control"
                  type="search"
                  onChange={handleInputChange}
                  placeholder="Search Your Favorite Games..."
                />
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faq">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-nav ml-auto">
          {isLoggedIn ? (
            <ul className="navbar-nav ml-auto align-items-center">
              <li className="nav-item">
                <Link
                to="/"
                className="nav-link px-3"
                onClick={() => {
                  Session.signOut();
                  setIsLoggedIn(false);
                }}
              >
                Logout
              </Link>
              </li>
              
              <Link className="nav-link px-3" to={`/profile/${user.username}`}>
                <img
                  alt=""
                  src={user.profile.profilePicture}
                  height="50"
                  className="rounded-circle"
                />
              </Link>
            </ul>
          ) : (
            <Link to="/auth" className="btn btn-secondary">
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default QTNavBar;
