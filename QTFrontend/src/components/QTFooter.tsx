import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as QTLogo } from "../assets/svg/QT.svg";

const QTFooter = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top container-fluid">
      <p className="col-md-5 mb-0 text-body-secondary">© 2025 Eukaryotic. All Rights Reserved. Game metadata is provided by <Link to="http://igdb.com">IGDB</Link>.</p>

      <Link
        to="/"
        className="col-md-2 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <QTLogo height="100" width="100" className="mx-2" />
      </Link>

      <ul className="nav col-md-5 justify-content-end">
        <li className="nav-item">
          <Link to="/" className="nav-link px-2 text-body-secondary">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/faq" className="nav-link px-2 text-body-secondary">
            FAQs
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link px-2 text-body-secondary">
            About
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default QTFooter;
