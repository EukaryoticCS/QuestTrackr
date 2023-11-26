import React, { useEffect, useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import Search from "./Search.tsx";
import QTFooter from "../components/QTFooter.tsx";
import { useParams } from "react-router-dom";
import Session, { doesSessionExist } from "supertokens-auth-react/recipe/session";
import TemplateCard from "../components/TemplateCard.tsx";

const Profile = () => {
  const [userData, setUserData] = useState({
    _id: "",
    supertokensId: "",
    username: "",
    profile: {
      profilePicture: "",
      bio: "",
    },
    templates: [{ _id: "", gameId: "", templateId: "", title: "", author: "", sections: [] }],
  });
  const { username } = useParams();
  const [userInputTitle, setUserInputTitle] = useState("");
  const [viewingOwnProfile, setViewingOwnProfile] = useState(false);

  const handleInputChange = (e) => {
    setUserInputTitle(e.target.value);
  };

  useEffect(() => {
    async function getUserData() {
      await fetch(`http://localhost:5000/api/v1/users/${username}`)
        .then((res) => res.json())
        .then(async (data) => {
          setUserData(data);
          if (await doesSessionExist() && await Session.getUserId() === data.supertokensId) {
            setViewingOwnProfile(true);
          } else {
            setViewingOwnProfile(false);
          }
        });
    }

    getUserData();
  }, [username]);

  const arrayTemplateItems = userData.templates.map((template) => (
    <TemplateCard
      gameId={template.gameId}
      templateId={template._id}
      key={template._id}
      title={template.title}
      author={template.author}
      link={
        viewingOwnProfile
          ? `/track/${userData.username}/${template._id}`
          : `/${template.gameId}/template/${template.templateId}`
      }
    />
  ));

  return (
    <>
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div className="container-fluid row h-100">
          <div className="col-md-8 flex-column">
            <div className="d-flex flex-row">
              <div style={{ height: 200 }}>
                <img
                  className="img-fluid h-100 card img-thumbnail rounded-circle"
                  alt=""
                  src={userData.profile.profilePicture}
                />
              </div>
              <div>
                <h1 className="display-1 m-2">{username}</h1>
                <h1>{userData.profile.bio}</h1>
              </div>
            </div>
            <div className="flex-row">
              {userData.templates.length > 0 ? (
                <div className="row row-cols-2 g-x-3">{arrayTemplateItems}</div>
              ) : (
                <div className="col text-center my-2">
                  <p className="display-2">
                    {viewingOwnProfile
                      ? "You haven't added any templates yet!"
                      : "This user has not added any templates yet!"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <h1 className="card-title display-3 text-center my-2">
              User Statistics
            </h1>
            <div className="row row-cols-1 gy-5">
              <div className="card bg-primary">
                <div className="card-body">
                  <p className="card-text h2 text-center">Played/Playing:</p>
                  <p className="card-text h2 text-center">
                    {userData.templates.length}
                  </p>
                </div>
              </div>
              <div className="card bg-secondary">
                <div className="card-body">
                  <p className="card-text h2 text-center">Completed:</p>
                  <p className="card-text h2 text-center">
                    {userData.templates.length}
                  </p>
                </div>
              </div>
              <div className="card bg-info">
                <div className="card-body">
                  <p className="card-text h2 text-center">
                    Average Completion Rate:
                  </p>
                  <p className="card-text h2 text-center">100%</p>
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

export default Profile;
