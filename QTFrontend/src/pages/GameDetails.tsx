import React, { useCallback, useEffect, useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import TemplateCard from "../components/TemplateCard.tsx";
import { useNavigate, useParams } from "react-router-dom";
import Search from "./Search.tsx";
import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import { doesSessionExist } from "supertokens-auth-react/recipe/session";
import { config } from "../constants.js";

const GameDetails = () => {
  const [details, setDetails] = useState({
    _id: "",
    summary: "",
    title: "",
    developers: [""],
    publishers: [""],
    releaseYear: 0,
    platforms: [""],
    templates: [{ _id: "", title: "", author: "" }],
    cover: "",
  });
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInputTitle, setUserInputTitle] = useState("");

  const handleInputChange = (e) => {
    setUserInputTitle(e.target.value);
  };

  useEffect(() => {
    async function checkLoginAndFetchData() {
      const userIsLoggedIn = await doesSessionExist();
      setIsLoggedIn(userIsLoggedIn);

      fetch(`${config.backend}/api/v1/games/` + gameId)
        .then((res) => res.json())
        .then((data) => {
          setDetails(data);
        });
    }

    checkLoginAndFetchData();
  }, [gameId]);

  const createTemplate = useCallback(
    async (gameId) => {
      if (await doesSessionExist()) {
        const userResponse = await axios.get(
          `${
            config.backend
          }/api/v1/users/supertokens/${await Session.getUserId()}`
        );
        const author = userResponse.data.username;
        const response = await axios.post(
          `${config.backend}/api/v1/games/${gameId}/templates`,
          { author: author }
        );
        const templateId = response.data.templateId;
        navigate(`/templatecreate/${gameId}/${templateId}`);
      } else {
        navigate(`/auth`);
      }
    },
    [navigate]
  );

  return (
    <div className="p-0">
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div className="container-fluid px-4">
          <div className="game-details-container row py-4">
            <div className="col-12 col-md-3 mb-4 mb-md-0 text-center text-md-start">
              <img
                className="game-cover img-fluid rounded shadow"
                alt={details.title}
                src={details.cover}
                style={{ maxHeight: "400px" }}
              />

              {isLoggedIn && (
                <div className="mt-3 d-grid">
                  <button
                    className="btn btn-primary"
                    onClick={() => createTemplate(gameId)}
                  >
                    Create Template
                  </button>
                </div>
              )}
            </div>

            <div className="col-12 col-md-9">
              <h1 className="display-4 mb-3">{details.title}</h1>

              <div className="row mb-4">
                <div className="col-12 col-md-8">
                  <div className="card bg-dark mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Summary</h5>
                      <p className="card-text">{details.summary}</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="card bg-dark h-100">
                    <div className="card-body">
                      <h5 className="card-title mb-3">Game Info</h5>

                      {details.releaseYear > 0 && (
                        <div className="mb-2">
                          <strong>Release Year:</strong> {details.releaseYear}
                        </div>
                      )}

                      {details.developers.length > 0 &&
                        details.developers[0] !== "" && (
                          <div className="mb-2">
                            <strong>Developers:</strong>
                            <ul className="list-unstyled ms-3 mb-0">
                              {details.developers.map((developer) => (
                                <li key={developer}>{developer}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {details.publishers.length > 0 &&
                        details.publishers[0] !== "" && (
                          <div className="mb-2">
                            <strong>Publishers:</strong>
                            <ul className="list-unstyled ms-3 mb-0">
                              {details.publishers.map((publisher) => (
                                <li key={publisher}>{publisher}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {details.platforms.length > 0 &&
                        details.platforms[0] !== "" && (
                          <div>
                            <strong>Platforms:</strong>
                            <ul className="list-unstyled ms-3 mb-0">
                              {details.platforms.map((platform) => (
                                <li key={platform}>{platform}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="templates-section mt-4">
                <h2 className="mb-3">Templates</h2>

                {details.templates.length > 0 &&
                details.templates[0]._id !== "" ? (
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {details.templates.map((template) => (
                      <TemplateCard
                        gameId={gameId!}
                        templateId={template._id}
                        key={template._id}
                        title={template.title}
                        author={template.author}
                        link={`/${gameId}/template/${template._id}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info">
                    <p className="mb-0">
                      No templates available for this game yet.
                    </p>
                    {isLoggedIn && (
                      <div className="mt-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => createTemplate(gameId)}
                        >
                          Create the First Template
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <QTFooter />
        </div>
      )}
    </div>
  );
};

export default GameDetails;
