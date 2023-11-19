import React, { useEffect, useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import TemplateCard from "../components/TemplateCard.tsx";
import { Link, useParams } from "react-router-dom";
import Search from "./Search.tsx";

const GameDetails = () => {
  const [details, setDetails] = useState({
    _id: "",
    summary: "",
    title: "",
    developers: [""],
    publishers: [""],
    releaseYear: 0,
    platforms: [""],
    templates: [{ title: "", author: "" }],
    cover: "",
  });
  const { gameId } = useParams();

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

  const arrayDeveloperItems = details.developers.map((developer) => (
    <li>{developer}</li>
  ));
  const arrayPublisherItems = details.publishers.map((publisher) => (
    <li>{publisher}</li>
  ));
  const arrayPlatformItems = details.platforms.map((platform) => (
    <li>{platform}</li>
  ));
  const arrayTemplateItems = details.templates.map((template) => (
    <TemplateCard
      title={template.title}
      author={template.author}
      imgUrl="templateExample.jpg"
    />
  ));

  return (
    <div className="p-0">
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <>
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
            <div className="card-deck">
              {arrayTemplateItems.length > 0 ? (
                arrayTemplateItems
              ) : (
                <div className="col text-center">
                  <div className="display-3 text-center">No Templates!</div>
                  <div className="display-5">Make one here:</div>
                  <Link className="btn btn-primary m-2" to="/templatecreate">
                    Create Template
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <QTFooter />
    </div>
  );
};

export default GameDetails;