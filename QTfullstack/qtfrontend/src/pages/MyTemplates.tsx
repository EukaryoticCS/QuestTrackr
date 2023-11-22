import React, { useState } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import Search from "./Search.tsx";
import QTFooter from "../components/QTFooter.tsx";

const MyTemplates = () => {
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
        <div></div>
      )}
      <QTFooter/>
    </>
  );
};

export default MyTemplates;
