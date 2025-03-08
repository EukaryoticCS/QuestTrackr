import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as QTLogo } from "../assets/svg/QT.svg";
import Session from "supertokens-auth-react/recipe/session";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { doesSessionExist } from "supertokens-auth-react/recipe/session";
import axios from "axios";
import { config } from "../constants";

function QTNavBar({ handleInputChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    profile: { profilePicture: "" },
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Session.signOut();
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <QTLogo height="40" width="60" className="me-2" />
          <span className="d-none d-sm-inline">QuestTrackr</span>
        </Link>

        {/* Search Bar - Visible on larger screens */}
        <div className="d-none d-lg-block flex-grow-1 mx-4">
          <input
            className="form-control"
            type="search"
            onChange={handleInputChange}
            placeholder="Search Your Favorite Games..."
          />
        </div>

        {/* Navigation Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar - Visible on mobile */}
          <div className="d-lg-none mb-3">
            <input
              className="form-control"
              type="search"
              onChange={handleInputChange}
              placeholder="Search Your Favorite Games..."
            />
          </div>

          {/* Navigation Links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link py-2" to="/about">
                <i className="bi bi-info-circle me-2"></i>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link py-2" to="/faq">
                <i className="bi bi-question-circle me-2"></i>
                FAQ
              </Link>
            </li>
            {/* Mobile-only navigation items */}
            {isLoggedIn && (
              <li className="nav-item d-lg-none">
                <Link
                  className="nav-link py-2"
                  to={`/profile/${user.username}`}
                >
                  <i className="bi bi-person-circle me-2"></i>
                  My Profile
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item d-lg-none">
                <Link className="nav-link py-2" to="/settings">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item d-lg-none">
                <button
                  className="nav-link py-2 w-100 text-start border-0 bg-transparent text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            )}
          </ul>

          {/* User Section - Desktop only */}
          <div className="d-none d-lg-flex align-items-center ms-auto">
            {isLoggedIn ? (
              <div className="position-relative" ref={dropdownRef}>
                <button
                  className="btn btn-link nav-link d-flex align-items-center border-0 p-0"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="d-flex align-items-center">
                    <img
                      alt=""
                      src={user.profile.profilePicture}
                      height="40"
                      width="40"
                      className="rounded-circle"
                    />
                    <span className="ms-2">{user.username}</span>
                    <i className="bi bi-chevron-down ms-2 small"></i>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                <div
                  className={`dropdown-menu dropdown-menu-end py-0 ${
                    showDropdown ? "show" : ""
                  }`}
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: "0.5rem",
                    minWidth: "220px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  {/* User Info Section */}
                  <Link
                    to={`/profile/${user.username}`}
                    className="px-3 py-2 bg-primary bg-opacity-50 text-decoration-none d-block"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        alt=""
                        src={user.profile.profilePicture}
                        height="32"
                        width="32"
                        className="rounded-circle me-2"
                      />
                      <div>
                        <div className="fw-semibold text-white">
                          {user.username}
                        </div>
                        <div className="small text-info-emphasis">
                          View Profile
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      className="dropdown-item d-flex align-items-center px-3 py-2"
                      to={`/profile/${user.username}`}
                      onClick={() => setShowDropdown(false)}
                    >
                      <i className="bi bi-person-circle me-2"></i>
                      My Profile
                    </Link>
                    <Link
                      className="dropdown-item d-flex align-items-center px-3 py-2"
                      to="/settings"
                      onClick={() => setShowDropdown(false)}
                    >
                      <i className="bi bi-gear me-2"></i>
                      Settings
                    </Link>
                  </div>

                  {/* Logout Section */}
                  <div className="border-top border-light border-opacity-10">
                    <button
                      className="dropdown-item d-flex align-items-center px-3 py-2 text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/auth" className="btn btn-secondary">
                Login/Register
              </Link>
            )}
          </div>

          {/* Mobile Login Button */}
          {!isLoggedIn && (
            <div className="d-lg-none">
              <Link to="/auth" className="btn btn-secondary w-100">
                Login/Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default QTNavBar;
