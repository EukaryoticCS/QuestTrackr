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
            <Accordion.Header>
              <h3>What is QuestTrackr?</h3>
            </Accordion.Header>
            <Accordion.Body className="accordion-body secondary">
              <div className="text-success">
                QuestTrackr is an online platform designed to assist users in
                tracking their progress in various video games. It allows gamers
                to organize game-related tasks, track completion, and manage
                their gaming achievements efficiently.
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h3>How do I start using QuestTrackr?</h3>
            </Accordion.Header>
            <Accordion.Body>
              <div className="text-success">
                To get started, simply sign up for a QuestTrackr account. Once
                registered, you can begin creating your own game tracking
                templates or explore and use existing ones available on the
                platform!
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h3>Can I create and customize my own Trackr Templates?</h3>
            </Accordion.Header>
            <Accordion.Body>
              <div className="text-success">
                Yes! In fact, QuestTrackr is almost exclusively community-run,
                so the users that create Trackr Templates help the entire
                community with their contributions. Users can customize
                templates by adding checkboxes, text fields, images, dropdowns,
                and other elements relevant to any game they wish to track.
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h3>How do I create a Trackr Template?</h3>
            </Accordion.Header>
            <Accordion.Body>
              <div className="text-success">
                To create a Trackr Template, use the searchbar at the top of the
                website to find to the game you would like to make a Template
                for, open up the Game Details page for that game, and click the
                "Create Template" button. You will be sent to the Template
                Creation page, where you can customize it to fit the progress of
                the game.
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h3>I'd love [x] feature, can you implement that?</h3>
            </Accordion.Header>
            <Accordion.Body>
              <div className="text-success">
                Maybe! Reach out to me at <strong>bssmith2021@gmail.com</strong>{" "}
                with your feature ideas or bugs you'd like me to fix!
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <h3>How do I start tracking my progress on a game?</h3>
            </Accordion.Header>
            <Accordion.Body>
              <div className="text-success">
                To track your progress on a game, first find the game using the
                searchbar at the top of the website. Once you've found the game
                you would like to track, scroll down and see if there are any
                Trackr Templates made by other users for that game. If there
                are, you can click on a Template to check out the details, then
                save it to your profile. If there aren't any templates (or none
                that you like), feel free to make your own template! Once you've
                saved a template to your profile, just go to your profile page,
                click on the template, and start tracking!
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>
              <h3>Where does QuestTrackr get its game data?</h3>
            </Accordion.Header>
            <Accordion.Body>
              <div className="text-success">
                QuestTrackr has an internal database of over 275,000 games (and
                counting!) dumped directly from{" "}
                <Link to="https://IGDB.com">IGDB.com</Link>. If your game is
                missing from the database, add it to IGDB and it should be added
                soon!
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="7">
            <Accordion.Header>
              <h3>Are there any fees associated with QuestTrackr?</h3>
            </Accordion.Header>
            <Accordion.Body>
              <div className="text-success">
                QuestTrackr is completely free for use. If you would like to
                donate or have any other questions/concerns, reach out to
                Brandon Smith at <strong>bssmith2021@gmail.com</strong>.
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="8">
            <Accordion.Header>
              <h3>Why did you make QuestTrackr?</h3>
            </Accordion.Header>
            <Accordion.Body>
              <div className="text-success">
                I'm a huge completionist and Zelda fan, and in the wait for The
                Legend of Zelda: Tears of the Kingdom's release, I challenged
                myself to 100% every Zelda game. To help me, I found a great set
                of completion spreadsheets online, but they're annoying to make,
                usually don't look great, and are boring to share. Thus, the
                idea for QuestTrackr was born.
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="9">
            <Accordion.Header>
              <h3>Did you actually 100% all the Zelda games?</h3>
            </Accordion.Header>
            <Accordion.Body>
              <div className="text-success">
                I got very close! I 100%'d the latest version of every game in
                release order up to A Link Between Worlds, but didn't get to
                Breath of the Wild or TriForce Heroes before TotK came out. I'm
                still working through them, and I'll have them all done one day!
                I've completed Tears of the Kingdom now, so only 2 remain...
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      <QTFooter />
    </>
  );
};

export default FAQ;
