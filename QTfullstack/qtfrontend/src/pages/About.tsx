import React, { useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import Search from "./Search.tsx";

const About = () => {
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
        <div>About Page</div>
      )}
      <QTFooter />
    </>
  );
};

export default About;
