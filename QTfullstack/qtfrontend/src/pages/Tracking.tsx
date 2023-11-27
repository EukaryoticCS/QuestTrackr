import React, { useState, useEffect } from "react";
import QTNavBar from "../components/QTNavBar.tsx";
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
    bgColor: "",
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
        //Somehow make nodes unselectable but still interactable
        console.log(data.trackingTemplate);
        setDetails(data.trackingTemplate);
      });
  }, [username, templateId]);

  const handleInputChange = (e) => {
    setUserInputTitle(e.target.value);
  };

  return (
    <div
      className="container-fluid d-flex flex-column m-0 p-0"
      style={{ height: "100vh", width: "100vw" }}
    >
      {userInputTitle !== "" ? (
        <Search userInputTitle={userInputTitle} />
      ) : (
        <div className="row p-0 m-0 flex-grow-1">
          <div className="p-0 m-0" style={{ height: "100%", width: "100%" }}>
            <ReactFlow
              minZoom={0.2}
              maxZoom={4}
              fitView
              nodes={details.layout}
              nodesDraggable={false}
              nodeTypes={nodeTypes}
              elementsSelectable={true}
              zoomOnDoubleClick={false}
              proOptions={{ hideAttribution: true }}
            >
              <Background variant={BackgroundVariant.Dots} style={{background: details.bgColor}}/>
              <MiniMap nodeColor={nodeColor} zoomable pannable />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;
