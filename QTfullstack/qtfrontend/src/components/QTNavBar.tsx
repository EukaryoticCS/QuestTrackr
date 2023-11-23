import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as QTLogo } from "../assets/svg/QT.svg";
import Session from "supertokens-auth-react/recipe/session";
import { doesSessionExist } from "supertokens-auth-react/recipe/session";

function QTNavBar({ handleInputChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkIfLoggedIn() {
      setIsLoggedIn(await doesSessionExist());
    }
    checkIfLoggedIn();
  }, []);

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
            <li className="nav-item mx-4">
              <form className="d-flex">
                <input
                  className="form-control mx-sm-2"
                  type="search"
                  onChange={handleInputChange}
                  placeholder="Search"
                />
              </form>
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
              {/* Should FAQ even go here? */}
            </li>
          </ul>
          <div className="nav navbar-nav ml-auto">
            {isLoggedIn ? (
              <>
                <Link className="nav-link px-3" to="/mytemplates">
                  My Templates
                </Link>
                <Link
                  to="/"
                  className="btn nav navbar-nav ml-auto"
                  onClick={() => {
                    Session.signOut();
                    setIsLoggedIn(false);
                  }}
                >
                  Log out
                </Link>
              </>
            ) : (
              <Link to="/auth" className="btn btn-secondary">
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default QTNavBar;
