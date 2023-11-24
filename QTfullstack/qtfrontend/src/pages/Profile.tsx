import React, { useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import Search from "./Search.tsx";
import QTFooter from "../components/QTFooter.tsx";
import { Link, useParams } from "react-router-dom";
import TemplateCard from "../components/TemplateCard.tsx";

const Profile = () => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    profile: {
      profilePicture: "",
      bio: "",
    },
    templates: [{ _id: "", gameId: "", title: "", author: "", sections: [] }],
  });
  const { username } = useParams();
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
        <div className="row">
          <div className="col-md-8">
            <img className="img-fluid card" alt="" src={userData.profile.profilePicture} height="300"/>
            <h1 className="display-1">{username}</h1>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Statistics</h5>
                <p className="card-text">Played: {userData.templates.length}</p>
                <p className="card-text">Completed: {userData.templates.length}</p>
                <p className="card-text">Average Completion %: 100%</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <QTFooter />
    </>
  );
};

export default Profile;
