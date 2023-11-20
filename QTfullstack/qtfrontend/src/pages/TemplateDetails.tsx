import React, { useState } from "react";
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

const TemplateDetails = () => {
  const [details, setDetails] = useState({
    _id: "",
    title: "",
    author: "",
    layout: [],
    sections: "",
  });
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
        <>
          <div className="row p-0" style={{ height: "50rem" }}>
            <div className="col p-0 m-0">
              <ReactFlow
                minZoom={0.2}
                maxZoom={4}
                fitView
                nodes={details.layout}
                nodesDraggable={false}
                nodeTypes={nodeTypes}
                elementsSelectable={false}
                proOptions={{ hideAttribution: true }}
              >
                <Background variant={BackgroundVariant.Dots} />
                <MiniMap nodeColor={nodeColor} zoomable pannable />
                <Controls showInteractive={false} />
              </ReactFlow>
            </div>
          </div>
        </>
      )}

      <QTFooter />
    </>
  );
};

export default TemplateDetails;