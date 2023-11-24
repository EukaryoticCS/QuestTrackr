import React, { useEffect, useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import TemplateExample from "../assets/jpg/templateExample.jpg";
import { Link } from "react-router-dom";
import Search from "./Search.tsx";
import Session from "supertokens-auth-react/recipe/session"
import { doesSessionExist } from "supertokens-auth-react/recipe/session";

const Home = () => {
  const [userInputTitle, setUserInputTitle] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sessionContext = Session.useSessionContext();

  const handleInputChange = (e) => {
    setUserInputTitle(e.target.value);
  };

  useEffect(() => {
    async function checkIfLoggedIn() {
      setIsLoggedIn(await doesSessionExist());
    }
    checkIfLoggedIn();
  }, [sessionContext]);

  return (
    <>
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div>
          <div className="row">
            <h1 className="display-1 text-body text-center m-3">
              Welcome to QuestTrackr!
            </h1>
          </div>
          <div className="row my-4">
            <div className="col-7 text-secondary h1 text-center m-auto">
              <p className="text-info">
                Are you a{" "}
                <strong className="h1 text-secondary font-weight-bold">
                  Completionist?
                </strong>
                <br />
                <br />
                Want to Track your{" "}
                <strong className="h1 text-secondary font-weight-bold">
                  game completion?
                </strong>
                <br />
                <br />
                <i
                  className="h1 text-body"
                  style={{ fontFamily: "Arial Black" }}
                >
                  You've come to the right place.
                </i>
              </p>
            </div>
            <div className="col-5 img-fluid float-end card">
              <img alt="" src={TemplateExample} className="mh-50" />
            </div>
          </div>
          <div className="row m-auto card-deck">
            <div className="card bg-primary">
              <div className="card-header text-center m-auto h2">
                Create Trackr Templates
              </div>
              <div className="card-body text-center m-auto h4">
                Use QuestTrackr's intuitive Template Designer to make stunning
                Trackr Templates for all your favorite games!
              </div>
            </div>
            <div className="card bg-secondary">
              <div className="card-header text-center m-auto h2">
                Track your Progress
              </div>
              <div className="card-body text-center m-auto h4">
                Mark off items, collectibles, sidequests, achievements, and more
                as you play through a game!
              </div>
            </div>
            <div className="card bg-info">
              <div className="card-header text-center m-auto h2">
                Show off to Friends!
              </div>
              <div className="card-body text-center m-auto h4">
                Feature tracked progress on your profile to share and compare
                with friends and other completionists!
              </div>
            </div>
          </div>
          <div className="row my-4">
            <div>
              <h1 className="text-center">Start Tracking Now!</h1>
            </div>
            {isLoggedIn ? (
              <Link
                className="btn btn-lg btn-secondary col-3 mx-auto"
                to="/mytemplates"
              >
                <h3>Go to My Profile</h3>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="btn btn-lg btn-secondary col-3 mx-auto"
              >
                <h3>Login/Register</h3>
              </Link>
            )}
          </div>
        </div>
      )}
      <QTFooter />
    </>
  );
};

export default Home;
