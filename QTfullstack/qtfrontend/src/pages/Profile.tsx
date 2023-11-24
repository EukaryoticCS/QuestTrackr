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
    profilePicture: "",
    bio: {},
    templates: [{_id: "", gameId: "", title: "", author: "", sections: []}]
  })
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
        <div className="container">
      <div className="row">
        {/* Left column for profile details */}
        <div className="col-md-6">
          <div className="d-flex align-items-center">
            {/* Circular profile picture */}
            <div className="rounded-circle profile-picture">
              <img src={userData.profilePicture} alt="Profile" />
            </div>
            {/* Username */}
            <h2 className="ms-3">{userData.username}</h2>
          </div>
          {/* Template cards */}
          <div className="row">
            {userData.templates.slice(0, 4).map((template) => (
              <div key={template._id} className="col-md-6 mb-3">
                <TemplateCard gameId={template.gameId} templateId={template._id} title={template.title} author={template.author} />
              </div>
            ))}
          </div>
          {/* See more button */}
          <Link to={`/profile/${username}/templates`} className="btn btn-primary">
            See more
          </Link>
        </div>
        {/* Right column for statistics */}
        <div className="col-md-6">
          {/* Played templates */}
          <div className="box mb-3">
            <h4>Played: {userData.templates.length}</h4>
          </div>
          {/* Completed templates */}
          <div className="box mb-3">
            <h4>Completed: {userData.templates.length}</h4>
          </div>
          {/* Average completion percentage */}
          <div className="box">
            <h4>Average Completion %: 100%</h4>
          </div>
        </div>
      </div>
    </div>
      )}
      <QTFooter/>
    </>
  );
};

export default Profile;
