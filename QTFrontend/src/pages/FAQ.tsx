import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import Search from "./Search.tsx";
import { Link } from "react-router-dom";

const FAQ = () => {
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
        <Accordion className="h3">
          {/* FAQ layout adapted from ChatGPT */}
          <Accordion.Item eventKey="0">
            <Accordion.Header><h3>What is QuestTrackr?</h3></Accordion.Header>
            <Accordion.Body>
              QuestTrackr is an online platform designed to assist users in
              tracking their progress in various video games. It allows gamers
              to organize game-related tasks, track completion, and manage
              their gaming achievements efficiently.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h3>How do I start using QuestTrackr?</h3>
            </Accordion.Header>
            <Accordion.Body>
              To get started, simply sign up for a QuestTrackr account. Once
              registered, you can begin creating your own game tracking
              templates or explore and use existing ones available on the
              platform!
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h3>Can I create and customize my own Trackr Templates?</h3>
            </Accordion.Header>
            <Accordion.Body>
              Yes! In fact, QuestTrackr is almost exclusively community-run, so
              the users that create Trackr Templates help the entire community
              with their contributions. Users can customize templates by adding
              checkboxes, text fields, images, dropdowns, and other elements
              relevant to any game they wish to track.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h3>How do I create a Trackr Template?</h3>
            </Accordion.Header>
            <Accordion.Body>
              To create a Trackr Template, use the searchbar at the top of the
              website to find to the game you would like to make a Template for,
              open up the Game Details page for that game, and click the "Create
              Template" button. You will be sent to the Template Creation page,
              where you can customize it to fit the progress of the game.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h3>Can I collaborate on a template that's already been made?</h3>
            </Accordion.Header>
            <Accordion.Body>
              Not currently. QuestTrackr aims to add a "Remix" feature in the
              near future in which users can take templates that have already
              been created and modify them to fit their needs.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <h3>How do I start tracking my progress on a game?</h3>
            </Accordion.Header>
            <Accordion.Body>
              To track your progress on a game, first find the game using the
              searchbar at the top of the website. Once you've found the game
              you would like to track, scroll down and see if there are any
              Trackr Templates made by other users for that game. If there are,
              you can click on a Template to check out the details, then save it
              to your profile. If there aren't any templates (or none that you
              like), feel free to make your own template! Once you've saved a
              template to your profile, just go to your profile page, click on
              the template, and start tracking!
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>
              <h3>Where does QuestTrackr get its game data?</h3>
            </Accordion.Header>
            <Accordion.Body>
              QuestTrackr has an internal database of over 250,000 games dumped
              directly from <Link to="https://IGDB.com">IGDB.com</Link>. If your
              game is missing from the database, add it to IGDB and it should be
              added soon!
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="7">
            <Accordion.Header>
              <h3>Are there any fees associated with QuestTrackr?</h3>
            </Accordion.Header>
            <Accordion.Body>
              QuestTrackr is completely free for use. If you would like to
              donate or have any other questions/concerns, reach out to Brandon
              Smith at <strong>bssmith2021@gmail.com</strong>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      <QTFooter />
    </>
  );
};

export default FAQ;
