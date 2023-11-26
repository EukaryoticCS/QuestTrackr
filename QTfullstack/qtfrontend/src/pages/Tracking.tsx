import React, { useState, useEffect } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
import QTFooter from "../components/QTFooter.tsx";
import Search from "./Search.tsx";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";
import ShapeNode from "../components/Nodes/ShapeNode.tsx";
import TextNode from "../components/Nodes/TextNode.tsx";
import ImageNode from "../components/Nodes/ImageNode.tsx";
import CheckboxNode from "../components/Nodes/CheckboxNode.tsx";
import NumberNode from "../components/Nodes/NumberNode.tsx";
import DropdownNode from "../components/Nodes/DropdownNode.tsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";

function nodeColor(node) {
  switch (node.type) {
    case "shapeNode":
      return "#133C55";
    case "textNode":
    case "imageNode":
      return "#386FA4";
    case "checkboxNode":
    case "numberNode":
    case "dropdownNode":
      return "#59A5D8";
    default:
      return "#FFFFFF";
  }
}

const nodeTypes = {
  shapeNode: ShapeNode,
  textNode: TextNode,
  imageNode: ImageNode,
  checkboxNode: CheckboxNode,
  numberNode: NumberNode,
  dropdownNode: DropdownNode,
};

const Tracking = () => {
  const [details, setDetails] = useState({
    _id: "",
    title: "",
    author: "",
    layout: [],
    sections: "",
  });
  const [userInputTitle, setUserInputTitle] = useState("");
  const { username, templateId } = useParams();

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/users/${username}/templates/${templateId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDetails(data.trackingTemplate);
      });
  }, [username, templateId]);

  const handleInputChange = (e) => {
    setUserInputTitle(e.target.value);
  };

  const handleAddToProfile = async () => {
    const userId = await Session.getUserId();
    const response = await axios.get(
      `http://localhost:5000/api/v1/users/supertokens/${userId}`
    );
    axios.post(
      `http://localhost:5000/api/v1/users/${response.data.username}/templates`,
      {
        templateData: details,
      }
    );
  };

  return (
    <>
      <QTNavBar handleInputChange={handleInputChange} />
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div className="container-fluid">
          <div className="row p-0" style={{ height: "38rem" }}>
            <div className="col d-flex p-0 m-0">
              <ReactFlow
                minZoom={0.2}
                maxZoom={4}
                fitView
                nodes={details.layout}
                nodesDraggable={false}
                nodeTypes={nodeTypes}
                elementsSelectable={true}
                proOptions={{ hideAttribution: true }}
              >
                <Background variant={BackgroundVariant.Dots} />
                <MiniMap nodeColor={nodeColor} zoomable pannable />
                <Controls showInteractive={false} />
              </ReactFlow>
            </div>
          </div>
        </div>
      )}
      <QTFooter />
    </>
  );
};

export default Tracking;
