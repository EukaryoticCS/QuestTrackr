import React from "react";
import "bootswatch/dist/vapor/bootstrap.min.css";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import TemplateExample from "../assets/jpg/templateExample.jpg";
import {
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleGoToProfile = () => navigate('/profile')

  return (
    <>
      <QTNavBar />
      <div className="row">
        <h1 className="display-1 text-body text-center m-3">
          Welcome to QuestTrackr!
        </h1>
      </div>
      <div className="row my-4">
        <div className="col-6 text-secondary h1 text-center m-auto">
          <p>
            Are you a <u>Completionist?</u>
            <br />
            <br />
            Want to Track your game completion?
            <br />
            <br />
            <strong>You've come to the right place.</strong>
          </p>
        </div>
        <div className="col-6 img-fluid float-end card">
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
            Mark off items, collectibles, sidequests, achievements, and more as
            you play through a game!
          </div>
        </div>
        <div className="card bg-info">
          <div className="card-header text-center m-auto h2">
            Show off to Friends!
          </div>
          <div className="card-body text-center m-auto h4">
            Feature tracked progress on your profile to share and compare with
            friends and other completionists!
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div>
          <h1 className="text-center">Start Tracking Now!</h1>
        </div>
        <SignedIn>
          <button className="btn btn-lg btn-secondary col-3 mx-auto" onClick={handleGoToProfile}>
            <h3>
              Go to Profile
            </h3>
          </button>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button
              type="button"
              className="btn btn-lg btn-secondary col-3 mx-auto"
            >
              <h3>Login/Register</h3>
            </button>
          </SignInButton>
        </SignedOut>
      </div>
      <QTFooter />
    </>
  );
};

export default Home;
