import React, { useCallback, useEffect, useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import TemplateCard from "../components/TemplateCard.tsx";
import { useNavigate, useParams } from "react-router-dom";
import Search from "./Search.tsx";
import axios from "axios";

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

  const [userInputTitle, setUserInputTitle] = useState("");

  const handleInputChange = (e) => {
    setUserInputTitle(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/games/" + gameId)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      });
  }, [gameId]);

  const createTemplate = useCallback(
    async (gameId) => {
      const author = "Eukaryotic";
      const response = await axios.post(
        `http://localhost:5000/api/v1/games/${gameId}/templates`,
        { author: author }
      );
      const templateId = response.data.templateId;
      navigate(`/templatecreate/${gameId}/${templateId}`);
    },
    [navigate]
  );

  const arrayDeveloperItems = details.developers.map((developer) => (
    <li key={developer}>{developer}</li>
  ));
  const arrayPublisherItems = details.publishers.map((publisher) => (
    <li key={publisher}>{publisher}</li>
  ));
  const arrayPlatformItems = details.platforms.map((platform) => (
    <li key={platform}>{platform}</li>
  ));
  const arrayTemplateItems = details.templates.map((template) => (
    <TemplateCard
      gameId={gameId!}
      templateId={template._id}
      key={template._id}
      title={template.title}
      author={template.author}
      link={`/${gameId}/template/${template._id}`}
    />
  ));

  return (
    <div className="p-0">
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 px-0 m-4">
              <img
                className="img-fluid card"
                alt=""
                src={details.cover}
                height="300"
              />
            </div>
            <div className="col md-3 m-4">
              <h2 className="display-1">{details.title}</h2>
              <div className="row border-primary">
                <div className="h3">
                  {details.summary}
                  <br />
                  <br />
                  Developer(s):
                  <ul>{arrayDeveloperItems}</ul>
                  Publisher(s):
                  <ul>{arrayPublisherItems}</ul>
                  <br />
                  Release Year: {details.releaseYear}
                  <br />
                  Platforms:
                  <ul>{arrayPlatformItems}</ul>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row ">
            <div className="display-1 text-center">Trackr Templates:</div>

            {arrayTemplateItems.length > 0 ? (
              <div className="row row-cols-4">{arrayTemplateItems}</div>
            ) : (
              <div className="col text-center">
                <div className="display-3 text-center">No Templates!</div>
                <div className="display-5">Make one here:</div>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => createTemplate(gameId)}
                >
                  Create Template
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <QTFooter />
    </div>
  );
};

export default GameDetails;
