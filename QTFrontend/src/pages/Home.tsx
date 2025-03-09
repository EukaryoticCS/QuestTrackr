import React, { useEffect, useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import TemplateExample from "../assets/jpg/BotWTemplateExample.jpg";
import { Link } from "react-router-dom";
import Search from "./Search.tsx";
import Session from "supertokens-auth-react/recipe/session";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { doesSessionExist } from "supertokens-auth-react/recipe/session";
import axios from "axios";
import { config } from "../constants.js";

const Home = () => {
  const [userInputTitle, setUserInputTitle] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    profile: { profilePicture: "" },
  });
  const sessionContext = useSessionContext();

  const handleInputChange = (e) => {
    setUserInputTitle(e.target.value);
  };

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
    <>
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div className="container-fluid px-4">
          <div className="row">
            <h1 className="display-3 text-body text-center my-3">
              Welcome to QuestTrackr!
            </h1>
          </div>
          <div className="row my-4">
            <div className="col-12 col-md-7 text-secondary text-center m-auto mb-4 mb-md-0">
              <p className="text-info fs-1">
                Are you a{" "}
                <strong className="text-secondary font-weight-bold">
                  Completionist?
                </strong>
                <br />
                <br />
                Want to Track your{" "}
                <strong className="text-secondary font-weight-bold">
                  game completion?
                </strong>
                <br />
                <br />
                <i className="text-body" style={{ fontFamily: "Arial Black" }}>
                  You've come to the right place.
                </i>
              </p>
            </div>
            <div className="col-12 col-md-5 text-center">
              <img
                alt="Template Example"
                src={TemplateExample}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 mb-4">
              <h2 className="text-center text-info">
                What can you do with QuestTrackr?
              </h2>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
            <div className="col">
              <div className="card h-100 bg-primary bg-gradient">
                <div className="card-header text-center h4">
                  Create Trackr Templates
                </div>
                <div className="card-body text-center">
                  Use QuestTrackr's intuitive Template Designer to make stunning
                  Trackr Templates for all your favorite games!
                </div>
                {isLoggedIn && (
                  <div className="card-footer text-center">
                    <Link to="/template/create" className="btn btn-light">
                      Create Template
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <div className="card h-100 bg-secondary bg-gradient">
                <div className="card-header text-center h4">
                  Track your Progress
                </div>
                <div className="card-body text-center">
                  Mark off items, collectibles, sidequests, achievements, and
                  more as you play through a game!
                </div>
                {isLoggedIn && (
                  <div className="card-footer text-center">
                    <Link
                      to={`/profile/${user.username}`}
                      className="btn btn-light"
                    >
                      My Templates
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <div className="card h-100 bg-info bg-gradient">
                <div className="card-header text-center h4">
                  Show off to Friends!
                </div>
                <div className="card-body text-center">
                  Share your profile with friends to show off all the games
                  you've completed!
                </div>
                {isLoggedIn && (
                  <div className="card-footer text-center">
                    <Link
                      to={`/profile/${user.username}`}
                      className="btn btn-light"
                    >
                      My Profile
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!isLoggedIn && (
            <div className="row my-5">
              <div className="col-12 text-center">
                <Link to="/auth" className="btn btn-primary btn-lg">
                  Sign Up Now to Get Started!
                </Link>
              </div>
            </div>
          )}
          <QTFooter />
        </div>
      )}
    </>
  );
};

export default Home;
