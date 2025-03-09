import React, { useEffect, useState } from "react";
import axios from "axios";
import QTNavBar from "../components/QTNavBar.tsx";
import Search from "./Search.tsx";
import QTFooter from "../components/QTFooter.tsx";
import { useParams, Link } from "react-router-dom";
import Session, {
  doesSessionExist,
} from "supertokens-auth-react/recipe/session";
import TemplateCard from "../components/TemplateCard.tsx";
import { config } from "../constants.js";
import { Form } from "react-bootstrap";

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
  const [isHoveringProfilePic, setIsHoveringProfilePic] = useState(false);

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

  const handleProfilePictureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("Upload handler triggered");
    if (!e.target.files || e.target.files.length === 0) {
      console.log("No files selected");
      return;
    }

    const file = e.target.files[0];
    console.log("Selected file:", file.name);
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Attempting to upload file...");
      // Upload the file
      const uploadResponse = await axios.post(
        `${config.backend}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Upload response:", uploadResponse);
      const imageUrl = uploadResponse.data;

      console.log("Updating user profile with new image URL:", imageUrl);
      // Update the user's profile
      await fetch(`${config.backend}/api/v1/users/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          profile: {
            ...userData.profile,
            profilePicture: imageUrl,
          },
        }),
      });

      // Update local state
      setUserData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          profilePicture: imageUrl,
        },
      }));
      console.log("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    }
  };

  const triggerFileInput = () => {
    // Find and click the hidden file input
    document.getElementById("profile-picture-input")?.click();
  };

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
      progress={100}
    />
  ));

  return (
    <>
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div className="container-fluid px-4">
          <Form.Control
            type="file"
            id="profile-picture-input"
            className="d-none"
            accept="image/*"
            onChange={handleProfilePictureUpload}
          />
          <div className="profile-header d-flex flex-column flex-md-row py-3 align-items-md-center">
            <div
              className="profile-avatar text-center text-md-start me-md-4 mb-3 mb-md-0"
              onMouseEnter={() => setIsHoveringProfilePic(true)}
              onMouseLeave={() => setIsHoveringProfilePic(false)}
              style={{ position: "relative" }}
            >
              <img
                className="img-fluid rounded-circle"
                alt={`${username}'s profile`}
                src={
                  userData.profile.profilePicture ||
                  "https://via.placeholder.com/150"
                }
                style={{ maxHeight: "150px", maxWidth: "150px" }}
              />
              {viewingOwnProfile && isHoveringProfilePic && (
                <div
                  onClick={triggerFileInput}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.5)",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="bi bi-camera-fill"
                    style={{ color: "white", fontSize: "1.5rem" }}
                  ></i>
                </div>
              )}
            </div>
            <div className="profile-info">
              <h1 className="display-4 mb-2">{username}</h1>
              <p className="lead">{userData.profile.bio}</p>

              {/* {viewingOwnProfile && (
                <div className="d-flex flex-wrap gap-2 mt-3">
                  <Link to="/settings" className="btn btn-outline-secondary">
                    Edit Profile
                  </Link>
                </div>
              )} */}
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
