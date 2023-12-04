import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import TemplateTools from "../components/TemplateTools.tsx";
import ShapeNode from "../components/Nodes/ShapeNode.tsx";
import TextNode from "../components/Nodes/TextNode.tsx";
import ImageNode from "../components/Nodes/ImageNode.tsx";
import CheckboxNode from "../components/Nodes/CheckboxNode.tsx";
import NumberNode from "../components/Nodes/NumberNode.tsx";
import DropdownNode from "../components/Nodes/DropdownNode.tsx";
import useStore from "../components/store.tsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, Button, Modal, Offcanvas } from "react-bootstrap";

const getNodeId = () => `${+new Date()}`;
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

// const sections = ["Total", "Inventory", "Quests", "Achievements"];

const selector = (state) => ({
  nodes: state.nodes,
  onNodesChange: state.onNodesChange,
  onAdd: state.onAdd,
  restoreNodes: state.restoreNodes,
  selectedNode: state.selectedNode,
  updateSelectedNode: state.updateSelectedNode,
  updateSection: state.updateSection,
});

function TemplateCreation() {
  const {
    nodes,
    onNodesChange,
    onAdd,
    restoreNodes,
    selectedNode,
    updateSelectedNode,
    // updateSection,
  } = useStore(selector);
  const [details, setDetails] = useState({
    _id: "",
    title: "",
    bgColor: "",
    snapToGrid: false,
    author: "",
    layout: [],
    sections: "",
  });
  const [showTemplateSettings, setShowTemplateSettings] = useState(false);
  const [showNodeSettings, setShowNodeSettings] = useState(false);
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const { screenToFlowPosition } = useReactFlow();

  const { gameId, templateId } = useParams();

  let title = useRef(null);
  let bgColor = useRef(null);
  let snapToGrid = useRef(null);
  const handleCloseTemplateSettings = () => setShowTemplateSettings(false);
  const handleShowTemplateSettings = () => setShowTemplateSettings(true);
  const handleSaveChanges = () => {
    setDetails({
      ...details,
      //@ts-ignore
      bgColor: bgColor.current!.value,
      //@ts-ignore
      title: title.current!.value,
      //@ts-ignore
      snapToGrid: snapToGrid.current!.checked,
    });
    setShowTemplateSettings(false);
  };
  const handleHideNodeSettings = () => setShowNodeSettings(false);

  const updateNodeSettings = (node) => {
    updateSelectedNode(node);
    setShowNodeSettings(true);
  };

  useEffect(() => {}, []);

  const handleShowSavedAlert = () => {
    setShowSavedAlert(true);
    window.setTimeout(() => {
      setShowSavedAlert(false);
    }, 2000);
  };

  useEffect(() => {
    async function getTemplate() {
      const response = await axios.get(
        `http://localhost:5000/api/v1/games/${gameId}/templates/${templateId}`
      );
      setDetails(response.data.template);
    }
    getTemplate();
    onRestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nodesIntoSections = useCallback(() => {
    const uniqueSections = [...new Set(nodes.map((node) => node.data.section))];

    const sectionList: any[] = [];
    uniqueSections.forEach((section) => {
      sectionList.push({
        name: section,
        checks: [],
      });
    });

    const index = sectionList.findIndex((section) => section.name === "Total");
    if (index === -1) {
      sectionList.push({ name: "Total", checks: [] });
    }

    nodes.forEach((node) => {
      let check;
      switch (node.type) {
        case "checkboxNode":
          check = {
            id: node.id,
            type: "checkbox",
            completed: false,
          };
          break;
        case "dropdownNode":
          check = {
            id: node.id,
            type: "dropdown",
            options: node.data.options,
            selected: node.data.options[0],
          };
          break;
        case "numberNode":
          check = {
            id: node.id,
            type: "number",
            total: node.data.total,
            collected: 0,
          };
          break;
        default:
          break;
      }
      if (check) {
        const foundSection = sectionList.find(
          (section) => section.name === node.data.section
        );
        foundSection.checks.push(check);
        if (foundSection.name !== "Total") {
          //Adds all checks to the "Total" section
          sectionList
            .find((section) => section.name === "Total")
            .checks.push(check);
        }
      }
    });

    return sectionList;
  }, [nodes]);

  const onSave = useCallback(async () => {
    handleShowSavedAlert();
    const nodeList = nodes.map((node) => ({
      ...node,
      selected: false,
    }));
    await axios.put(`http://localhost:5000/api/v1/games/${gameId}/templates`, {
      templateData: {
        _id: templateId,
        title: details.title,
        bgColor: details.bgColor,
        snapToGrid: details.snapToGrid,
        author: details.author,
        sections: nodesIntoSections(),
        layout: nodeList,
      },
    });
  }, [
    nodes,
    gameId,
    templateId,
    details.title,
    details.bgColor,
    details.snapToGrid,
    details.author,
    nodesIntoSections,
  ]);

  const onRestore = useCallback(async () => {
    restoreNodes(details.layout);
  }, [restoreNodes, details]);

  return (
    <div className="row min-vh-100 p-0 container-fluid">
      <div className="d-flex col-sm-auto py-0 pe-0 m-0">
        <TemplateTools
          onShapesClick={() => {
            const reactFlowContainer = document.querySelector(".react-flow");
            const reactFlowBounds = reactFlowContainer?.getBoundingClientRect();

            const center = screenToFlowPosition({
              x: reactFlowBounds!.width * 0.5,
              y: reactFlowBounds!.height * 0.5,
            });

            onAdd({
              id: getNodeId(),
              key: getNodeId(),
              position: { x: center.x, y: center.y },
              type: "shapeNode",
              data: {
                color: "#ffffff",
                selectable: true,
                section: "Total",
              },
              style: {
                border: "1px solid black",
                borderRadius: 15,
                fontSize: 12,
                zIndex: -1,
                height: 20,
                width: 40,
              },
            });
          }}
          onTextClick={() => {
            const reactFlowContainer = document.querySelector(".react-flow");
            const reactFlowBounds = reactFlowContainer?.getBoundingClientRect();

            const center = screenToFlowPosition({
              x: reactFlowBounds!.width * 0.5,
              y: reactFlowBounds!.height * 0.5,
            });

            onAdd({
              id: getNodeId(),
              key: getNodeId(),
              position: { x: center.x, y: center.y },
              type: "textNode",
              data: {
                textColor: "#ffffff",
                fontSize: 16,
                text: "Input Text Here",
                selectable: true,
              },
              style: {
                height: 40,
                width: 140,
              },
            });
          }}
          onImageClick={() => {
            const reactFlowContainer = document.querySelector(".react-flow");
            const reactFlowBounds = reactFlowContainer?.getBoundingClientRect();

            const center = screenToFlowPosition({
              x: reactFlowBounds!.width * 0.5,
              y: reactFlowBounds!.height * 0.5,
            });

            onAdd({
              id: getNodeId(),
              key: getNodeId(),
              position: { x: center.x, y: center.y },
              data: {
                img: "https://cdn.wikimg.net/en/zeldawiki/images/3/3a/LA_Shield_Sprite.png",
                updateNodeSettings: updateNodeSettings,
                selectable: true,
              },
              type: "imageNode",
              style: {
                fontSize: 15,
                height: 20,
                width: 40,
              },
            });
          }}
          onCheckboxClick={() => {
            const reactFlowContainer = document.querySelector(".react-flow");
            const reactFlowBounds = reactFlowContainer?.getBoundingClientRect();

            const center = screenToFlowPosition({
              x: reactFlowBounds!.width * 0.5,
              y: reactFlowBounds!.height * 0.5,
            });

            onAdd({
              id: getNodeId(),
              key: getNodeId(),
              position: { x: center.x, y: center.y },
              data: {
                selectable: true,
                updateNodeSettings: updateNodeSettings,
                section: "Total",
                checked: false,
              },
              type: "checkboxNode",
              style: {
                fontSize: 15,
                height: 20,
                width: 20,
              },
            });
          }}
          onNumbersClick={() => {
            const reactFlowContainer = document.querySelector(".react-flow");
            const reactFlowBounds = reactFlowContainer?.getBoundingClientRect();

            const center = screenToFlowPosition({
              x: reactFlowBounds!.width * 0.5,
              y: reactFlowBounds!.height * 0.5,
            });

            onAdd({
              id: getNodeId(),
              key: getNodeId(),
              position: { x: center.x, y: center.y },
              data: {
                textColor: "#ffffff",
                total: 20,
                selectable: true,
                updateNodeSettings: updateNodeSettings,
                fontSize: 16,
                section: "Total",
                collected: 0,
              },
              type: "numberNode",
            });
          }}
          onDropdownClick={() => {
            const reactFlowContainer = document.querySelector(".react-flow");
            const reactFlowBounds = reactFlowContainer?.getBoundingClientRect();

            const center = screenToFlowPosition({
              x: reactFlowBounds!.width * 0.5,
              y: reactFlowBounds!.height * 0.5,
            });

            onAdd({
              id: getNodeId(),
              key: getNodeId(),
              position: { x: center.x, y: center.y },
              data: {
                options: [
                  "N/A",
                  "Lv1",
                  "Lv2",
                  "Lv3",
                ],
                selectable: true,
                updateNodeSettings: updateNodeSettings,
                section: "Total",
                selected: "N/A"
              },
              type: "dropdownNode",
            });
          }}
          handleShowSavedAlert={onSave}
          handleShowTemplateSettings={handleShowTemplateSettings}
        />
      </div>
      <div className="col p-0 m-0">
        <ReactFlow
          minZoom={0.2}
          maxZoom={4}
          fitView
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          snapToGrid={details.snapToGrid}
          snapGrid={[20, 20]}
          zoomOnDoubleClick={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            style={{ background: details.bgColor }}
          />
          <MiniMap nodeColor={nodeColor} zoomable pannable />
          <Controls />
        </ReactFlow>
      </div>

      <Modal
        show={showTemplateSettings}
        onHide={handleCloseTemplateSettings}
        centered
        style={{ position: "fixed" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Template Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="title">Template Title:</label>
              <input
                ref={title}
                type="text"
                placeholder="Enter title here"
                defaultValue={details.title}
                name="title"
                className="form-control"
              />
            </div>
            <div className="form-group form-row">
              <label htmlFor="bgcolor" className="form-label">
                Background color:
              </label>
              <input
                type="color"
                name="bgColor"
                defaultValue={details.bgColor}
                ref={bgColor}
                className="form-control form-control-color"
              />
            </div>
            <div className="form-check form-check-inline">
              <label htmlFor="snapToGrid" className="form-check-label">
                Snap to Grid?
              </label>
              <input
                type="checkbox"
                id="snapToGrid"
                defaultChecked={details.snapToGrid}
                ref={snapToGrid}
                className="form-check-input"
                style={{ height: 20, width: 20 }}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTemplateSettings}>
            Close
          </Button>
          <Button variant="info" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Offcanvas
        show={showNodeSettings}
        onHide={handleHideNodeSettings}
        scroll={true}
        backdrop={false}
        placement="end"
        className="bg-primary text-dark h3"
        style={{ textShadow: "none", position: "fixed" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="h1 fw-bold" style={{ textShadow: "none" }}>
              Node Settings
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="col-12">
            Node ID: {selectedNode.id}
            {/* <Dropdown drop="down-centered" style={{ zIndex: 50000 }}>
              <Dropdown.Toggle variant="primary">
                {selectedNode.data.section}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {sections.map((option: string) => {
                  return (
                    <Dropdown.Item
                      key={option}
                      onClick={() => {
                        updateSection(selectedNode.id, option);
                      }}
                    >
                      {option}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
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
}

export default TemplateCreation;
