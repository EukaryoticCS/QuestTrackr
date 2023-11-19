import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as QTLogo } from "../assets/svg/QT.svg";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function QTNavBar({handleInputChange}) {

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
            <li className="nav-item">
              <Link className="nav-link" to="/templatecreate">
                Template Creation
              </Link>
            </li>
          </ul>
          <div className="nav navbar-nav ml-auto">
            <SignedIn>
              <UserButton afterSignOutUrl="/"/>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button type="button" className="btn btn-secondary">
                  Login/Register
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default QTNavBar;
