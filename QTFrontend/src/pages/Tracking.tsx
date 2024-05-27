import React, { useState, useEffect, useCallback } from "react";
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
import PercentageNode from "../components/Nodes/PercentageNode.tsx";
import { useParams } from "react-router-dom";
import TrackingTools from "../components/TrackingTools.tsx";
import { Alert } from "react-bootstrap";
import useStore from "../components/store.tsx";
import axios from "axios";

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
    case "percentageNode":
      return "#42bcf5";
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
  percentageNode: PercentageNode,
};

const Tracking = () => {
  const nodes = useStore((state) => state.nodes);
  const restoreNodes = useStore((state) => state.restoreNodes);
  const [details, setDetails] = useState({
    _id: "",
    title: "",
    author: "",
    bgColor: "",
    layout: [],
    sections: [],
  });
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const { username, templateId } = useParams();

  const handleShowSavedAlert = () => {
    setShowSavedAlert(true);
    window.setTimeout(() => {
      setShowSavedAlert(false);
    }, 2000);
  };

  const onSave = useCallback(async () => {
    handleShowSavedAlert();
    await axios.put(
      `http://localhost:5000/api/v1/users/${username}/templates/${templateId}`,
      {
        templateData: {
          _id: details._id,
          layout: nodes,
        },
      }
    );
  }, [templateId, username, details._id, nodes]);

  const onRestore = useCallback(async () => {
    restoreNodes(details.layout);
  }, [details, restoreNodes]);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/users/${username}/templates/${templateId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.trackingTemplate);
        setDetails(data.trackingTemplate);
      });
  }, [username, templateId]);

  useEffect(() => {
    onRestore();
  }, [details.layout, onRestore]);

  return (
    <div
      className="row min-vh-100 p-0 container-fluid"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="d-flex col-sm-auto py-0 pe-0 m-0">
        <TrackingTools handleShowSavedAlert={onSave} />
      </div>
      <div className="col p-0 m-0" style={{ height: "100%", width: "100%" }}>
        <ReactFlow
          minZoom={0.2}
          maxZoom={4}
          fitView
          nodes={details.layout}
          nodesDraggable={false}
          nodeTypes={nodeTypes}
          zoomOnDoubleClick={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            style={{ background: details.bgColor }}
          />
          <MiniMap nodeColor={nodeColor} zoomable pannable />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "fixed",
          top: "10px",
          width: "100%",
          zIndex: "9999",
        }}
      >
        <Alert
          variant="success"
          show={showSavedAlert}
          style={{ width: "fit-content" }}
          className="text-black"
        >
          <div className="d-flex row justify-content-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="black"
              className="bi bi-floppy col"
              viewBox="0 0 16 16"
            >
              <path d="M11 2H9v3h2z" />
              <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
            </svg>
            <div className="col h5">Saved!</div>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default Tracking;
