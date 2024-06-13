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
                    I'm Brandon Smith, a senior at Neumont College of Computer
                    Science in Salt Lake City, Utah. Neumont requires students
                    to take a class called "Capstone" where they work on a
                    project by themselves and create it from start to finish in
                    10 weeks. I'm a huge data nerd and I love spreadsheets. I've
                    used spreadsheets to track my completion through the various
                    Zelda games as I played through them, but I thought a
                    centralized website to track game progression would be a fun
                    choice for my Capstone project, so QuestTrackr was born.
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
                  <ul className="list-group list-group-flush h4">
                    <li className="list-group-item bg-transparent text-light">
                      <strong>Email: </strong>
                      <Link to="mailto:bssmith2021@gmail.com">
                        bssmith2021@gmail.com
                      </Link>
                    </li>
                    <li className="list-group-item bg-transparent text-light">
                      <strong>GitHub: </strong>{" "}
                      <Link to="https://github.com/EukaryoticCS">
                        EukaryoticCS
                      </Link>
                    </li>
                    <li className="list-group-item bg-transparent text-light">
                      <strong>LinkedIn: </strong>
                      <Link to="https://www.linkedin.com/in/eukaryoticcs/">
                        eukaryoticcs
                      </Link>
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
