import React, { useEffect, useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import Search from "./Search.tsx";
import QTFooter from "../components/QTFooter.tsx";
import { useParams, Link } from "react-router-dom";
import Session, {
  doesSessionExist,
} from "supertokens-auth-react/recipe/session";
import TemplateCard from "../components/TemplateCard.tsx";
import { config } from "../constants.js";

const Profile = () => {
  const [userData, setUserData] = useState({
    _id: "",
    supertokensId: "",
    username: "",
    profile: {
      profilePicture: "",
      bio: "",
    },
    templates: [
      {
        _id: "",
        gameId: "",
        templateId: "",
        title: "",
        author: "",
        sections: [],
      },
    ],
  });
  const { username } = useParams();
  const [userInputTitle, setUserInputTitle] = useState("");
  const [viewingOwnProfile, setViewingOwnProfile] = useState(false);

  const handleInputChange = (e) => {
    setUserInputTitle(e.target.value);
  };

  useEffect(() => {
    async function getUserData() {
      fetch(`${config.backend}/api/v1/users/${username}`)
        .then((res) => res.json())
        .then(async (data) => {
          setUserData(data);
          setViewingOwnProfile(
            (await doesSessionExist()) &&
              (await Session.getUserId()) === data.supertokensId
          );
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
        <div className="container-fluid px-4">
          <div className="profile-header d-flex flex-column flex-md-row py-3 align-items-md-center">
            <div className="profile-avatar text-center text-md-start me-md-4 mb-3 mb-md-0">
              <img
                className="img-fluid rounded-circle"
                alt={`${username}'s profile`}
                src={userData.profile.profilePicture}
                style={{ maxHeight: "150px", maxWidth: "150px" }}
              />
            </div>
            <div className="profile-info">
              <h1 className="display-4 mb-2">{username}</h1>
              <p className="lead">{userData.profile.bio}</p>

              {viewingOwnProfile && (
                <div className="d-flex flex-wrap gap-2 mt-3">
                  <Link to="/settings" className="btn btn-outline-secondary">
                    Edit Profile
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="mb-3">Templates</h2>
            {userData.templates.length > 0 ? (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {arrayTemplateItems}
              </div>
            ) : (
              <div className="alert alert-info text-center p-4">
                <p className="h4 mb-3">
                  {viewingOwnProfile
                    ? "You haven't added any templates yet!"
                    : "This user has not added any templates yet!"}
                </p>
              </div>
            )}
          </div>

          <QTFooter />
        </div>
      )}
    </>
  );
};

export default Profile;
