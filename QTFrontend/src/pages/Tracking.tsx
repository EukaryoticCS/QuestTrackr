import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useReactFlow,
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
import { Alert, Button, Offcanvas } from "react-bootstrap";
import useStore from "../components/store.tsx";
import axios from "axios";
import { config } from "../constants.js";

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
  const [showMobileTools, setShowMobileTools] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { username, templateId } = useParams();
  const reactFlowInstance = useReactFlow();

  // Handle window resize to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShowSavedAlert = () => {
    setShowSavedAlert(true);
    window.setTimeout(() => {
      setShowSavedAlert(false);
    }, 2000);
  };

  const onSave = useCallback(async () => {
    handleShowSavedAlert();
    await axios.put(
      `${config.backend}/api/v1/users/${username}/templates/${templateId}`,
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
    fetch(`${config.backend}/api/v1/users/${username}/templates/${templateId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.trackingTemplate);
        setDetails(data.trackingTemplate);
      });
  }, [username, templateId]);

  useEffect(() => {
    onRestore();
  }, [details.layout, onRestore]);

  // Function to fit view when in mobile mode
  const handleFitView = () => {
    reactFlowInstance.fitView({ padding: 0.2 });
  };

  return (
    <div
      className="row min-vh-100 p-0 container-fluid"
      style={{ height: "100vh", width: "100vw" }}
    >
      {/* Desktop sidebar */}
      {!isMobile && (
        <div className="d-none d-md-flex col-md-auto py-0 pe-0 m-0">
          <TrackingTools handleShowSavedAlert={onSave} />
        </div>
      )}

      {/* Mobile floating action buttons */}
      {isMobile && (
        <div className="position-fixed bottom-0 end-0 m-3 d-flex flex-column gap-2 z-3">
          <Button
            variant="primary"
            className="rounded-circle p-2 shadow"
            style={{ width: "50px", height: "50px" }}
            onClick={handleFitView}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-fullscreen"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
            </svg>
          </Button>
          <Button
            variant="primary"
            className="rounded-circle p-2 shadow"
            style={{ width: "50px", height: "50px" }}
            onClick={() => setShowMobileTools(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-gear-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
          </Button>
          <Button
            variant="success"
            className="rounded-circle p-2 shadow"
            style={{ width: "50px", height: "50px" }}
            onClick={onSave}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-save-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z" />
            </svg>
          </Button>
        </div>
      )}

      {/* Mobile tools offcanvas */}
      <Offcanvas
        show={showMobileTools}
        onHide={() => setShowMobileTools(false)}
        placement="bottom"
        className="h-50"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Template Tools</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between">
              <h5>Template: {details.title}</h5>
              <p>By: {details.author}</p>
            </div>
            <Button variant="success" onClick={onSave} className="w-100">
              Save Progress
            </Button>
            <div className="mt-3">
              <h6>Sections:</h6>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {details.sections &&
                  details.sections.map((section, index) => (
                    <Button key={index} variant="outline-primary" size="sm">
                      {section}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

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
          className="touch-manipulation"
        >
          <Background
            variant={BackgroundVariant.Dots}
            style={{ background: details.bgColor }}
          />
          {!isMobile && <MiniMap nodeColor={nodeColor} zoomable pannable />}
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
