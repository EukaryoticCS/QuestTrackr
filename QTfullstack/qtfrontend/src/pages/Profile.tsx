import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    async function getUserData() {
      await fetch(`http://localhost:5000/api/v1/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        });
    }
    getUserData();
  }, [username]);

  return (
    <>
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div className="container-fluid row">
          <div className="col-md-8 d-flex" style={{ height: 200 }}>
            <img
              className="img-fluid card img-thumbnail rounded-circle"
              alt=""
              src={userData.profile.profilePicture}
            />
            <div>
              <h1 className="display-1">{username}</h1>
              <h1>{userData.profile.bio}</h1>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title display-3">User Statistics</h1>
                <p className="card-text h3">
                  Played: {userData.templates.length}
                </p>
                <p className="card-text h3">
                  Completed: {userData.templates.length}
                </p>
                <p className="card-text h3">Average Completion Rate: 100%</p>
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
