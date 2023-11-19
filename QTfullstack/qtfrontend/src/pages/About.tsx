import React, { useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import Search from "./Search.tsx";
import profilePic from "../assets/jpg/profile.jpg";
import { Link } from "react-router-dom";

const About = () => {
  const [userInputTitle, setUserInputTitle] = useState("");

  const handleInputChange = (e) => {
    setUserInputTitle(e.target.value);
  };

  return (
    <>
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div className="container mt-5">
          {/* About Layout adapted from ChatGPT */}
          <h1 className="text-center text-light">About</h1>
          <div className="row mt-4">
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow">
                <img
                  src={profilePic}
                  className="card-img-top rounded-circle"
                  alt="Profile"
                />
                <div className="card-body text-center">
                  <h2 className="card-title text-light">Brandon Smith</h2>
                  <h3 className="card-title text-light">Eukaryotic</h3>
                  <p className="card-text text-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam tincidunt diam eu mauris tempus mollis. Duis mollis
                    augue vel mauris tincidunt sollicitudin.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h3 className="card-title text-light">
                    Additional Information
                  </h3>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent text-light">
                      <strong>Email:</strong> brsmith@student.neumont.edu
                    </li>
                    <li className="list-group-item bg-transparent text-light">
                      <strong>GitHub: </strong> <Link to="https://github.com/EukaryoticCS">EukaryoticCS</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <QTFooter />
    </>
  );
};

export default About;
