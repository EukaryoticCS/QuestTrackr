import React from "react";
import "bootswatch/dist/vapor/bootstrap.min.css";
import QTNavBar from "../components/QTNavBar.tsx";
import {} from "react-bootstrap";
import QTFooter from "../components/QTFooter.tsx";

const Home = () => {
  return (
    <>
      <QTNavBar username="Eukaryotic" />
      <h1 className="display-1 text-center">Welcome to QuestTrackr!</h1>
      <QTFooter />
    </>
  );
};

export default Home;
