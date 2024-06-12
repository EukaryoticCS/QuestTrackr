import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  useReactFlow,
  useOnSelectionChange,
  useKeyPress,
} from "reactflow";
import "reactflow/dist/style.css";
import TemplateTools from "../components/TemplateTools.tsx";
import ShapeNode from "../components/Nodes/ShapeNode.tsx";
import TextNode from "../components/Nodes/TextNode.tsx";
import ImageNode from "../components/Nodes/ImageNode.tsx";
import CheckboxNode from "../components/Nodes/CheckboxNode.tsx";
import NumberNode from "../components/Nodes/NumberNode.tsx";
import DropdownNode from "../components/Nodes/DropdownNode.tsx";
import PercentageNode from "../components/Nodes/PercentageNode.tsx";
import useStore from "../components/store.tsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Offcanvas,
  Stack,
} from "react-bootstrap";
import EditableListItem from "../components/EditableListItem.tsx";
import { config } from "../constants.js";

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
  percentageNode: PercentageNode,
};

// const sections = ["Total", "Inventory", "Quests", "Achievements"];

const selector = (state) => ({
  nodes: state.nodes,
  sections: state.sections,
  onNodesChange: state.onNodesChange,
  onAdd: state.onAdd,
  restoreNodes: state.restoreNodes,
  selectedNode: state.selectedNode,
  updateSelectedNode: state.updateSelectedNode,
  updateSection: state.updateSection,
  updateImage: state.updateImage,
  updateTotal: state.updateTotal,
  deleteSection: state.deleteSection,
  addSection: state.addSection,
  renameSection: state.renameSection,
  restoreSections: state.restoreSections,
  addDropdownOption: state.addDropdownOption,
  // editDropdownOption: state.editDropdownOption,
  deleteDropdownOption: state.deleteDropdownOption,
});

function TemplateCreation() {
  const {
    nodes,
    sections,
    onNodesChange,
    onAdd,
    restoreNodes,
    selectedNode,
    updateSelectedNode,
    updateSection,
    updateImage,
    updateTotal,
    deleteSection,
    addSection,
    renameSection,
    restoreSections,
    addDropdownOption,
    // editDropdownOption,
    deleteDropdownOption,
  } = useStore(selector);
  const [details, setDetails] = useState({
    _id: "",
    title: "",
    bgColor: "",
    snapToGrid: false,
    author: "",
    layout: [],
    sections: [],
  });
  const [showTemplateSettings, setShowTemplateSettings] = useState(false);
  const [showNodeSettings, setShowNodeSettings] = useState(false);
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const { screenToFlowPosition } = useReactFlow();

  const { gameId, templateId } = useParams();

  let title = useRef(null);
  let bgColor = useRef(null);
  let snapToGrid = useRef(null);
  let newSection = useRef(null);
  let newOption = useRef(null);
  let setTotal = useRef(null);
  const handleCloseTemplateSettings = () => setShowTemplateSettings(false);
  const handleShowTemplateSettings = () => {
    console.log(details);
    setShowTemplateSettings(true);
  };
  const handleSaveChanges = () => {
    if (title.current !== null && title.current !== "") {
      setDetails({
        ...details,
        layout: nodes,
        //@ts-ignore
        bgColor: bgColor.current!.value,
        //@ts-ignore
        title: title.current.value,
        //@ts-ignore
        snapToGrid: snapToGrid.current!.checked,
        sections: sections,
      });

      onSave();

      setShowTemplateSettings(false);
    }
  };
  const handleHideNodeSettings = () => setShowNodeSettings(false);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length === 1) {
        updateSelectedNode(nodes[0]);
      }
    },
  });

  const updateNodeSettings = (node) => {
    updateSelectedNode(node);
    console.log(node);
    setShowNodeSettings(true);
  };

  const handleShowSavedAlert = () => {
    setShowSavedAlert(true);
    window.setTimeout(() => {
      setShowSavedAlert(false);
    }, 2000);
  };

  const handleAddSection = () => {
    //@ts-ignore
    const section = newSection.current.value;
    if (!sections.includes(section) && section !== null && section !== "") {
      addSection(section);
    }
  };

  const handleSaveEditSection = (section, newName) => {
    renameSection(section, newName);
    console.log(newName);
    nodes.forEach((node) => {
      if (node.data.section === section) {
        updateSection(node.id, newName);
      }
    });
  };

  const handleDeleteSection = function (section) {
    deleteSection(section);
    nodes.forEach((node) => {
      if (node.data.section === section) {
        updateSection(node.id, "Total");
      }
    });
  };

  const uploadNewImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      let formData = new FormData();
      formData.append("file", e.target.files[0], e.target.files[0].name);
      const response = await axios.post(`${config.backend}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageURL = response.data;

      updateImage(selectedNode.id, imageURL);
    }
  };

  useEffect(() => {
    async function getTemplate() {
      const response = await axios.get(
        `${config.backend}/api/v1/games/${gameId}/templates/${templateId}`
      );
      setDetails(response.data.template);
    }
    getTemplate();
    // onRestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSave = useCallback(async () => {
    console.log("Saving...");
    handleShowSavedAlert();
    const nodeList = nodes.map((node) => ({
      ...node,
      selected: false,
    }));
    await axios.put(`${config.backend}/api/v1/games/${gameId}/templates`, {
      templateData: {
        _id: templateId,
        title: details.title,
        bgColor: details.bgColor,
        sections: sections,
        layout: nodeList,
      },
    });
  }, [nodes, gameId, templateId, details.title, details.bgColor, sections]);

  const onRestore = useCallback(async () => {
    console.log("Restoring nodes...");
    console.log(details.sections);
    restoreNodes(details.layout);
    restoreSections(details.sections);
  }, [restoreNodes, restoreSections, details]);

  useEffect(() => {
    onRestore();
  }, [details.layout, onRestore]);

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
                updateNodeSettings: updateNodeSettings,
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
                updateNodeSettings: updateNodeSettings,
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
                options: ["N/A", "Lv1", "Lv2", "Lv3"],
                selectable: true,
                updateNodeSettings: updateNodeSettings,
                section: "Total",
                selected: "N/A",
              },
              style: {
                height: 40,
                width: 80,
              },
              type: "dropdownNode",
            });
          }}
          onPercentageClick={() => {
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
                fontSize: 16,
                selectable: true,
                percentage: 0,
                updateNodeSettings: updateNodeSettings,
                section: "Total",
              },
              style: {
                height: 20,
                width: 40,
              },
              type: "percentageNode",
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
                className="form-check-input mb-3"
                style={{ height: 20, width: 20 }}
              />
            </div>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Add new section..."
                aria-label="Add new section..."
                aria-describedby="basic-addon2"
                ref={newSection}
              />
              <Button
                variant="success"
                id="button-addon"
                onClick={handleAddSection}
              >
                +
              </Button>
            </InputGroup>

            <ListGroup style={{ maxHeight: "220px", overflowY: "scroll" }}>
              <>
                {sections.map((section: string) => {
                  return (
                    <ListGroup.Item key={section}>
                      <EditableListItem
                        text={section}
                        onEdit={(section, newName) =>
                          handleSaveEditSection(section, newName)
                        }
                        onDelete={(section) => handleDeleteSection(section)}
                      />
                    </ListGroup.Item>
                  );
                })}
              </>
            </ListGroup>
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
            {selectedNode.type === "imageNode" && (
              <Form>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      uploadNewImage(e)
                    }
                  />
                </Form.Group>
              </Form>
            )}
            {selectedNode.type === "percentageNode" && <div></div>}
            {selectedNode.type === "numberNode" && (
              <>
                <Form.Control
                  defaultValue={selectedNode.data.total}
                  placeholder="Total to collect"
                  aria-label="Total"
                  aria-describedby="set-total"
                  ref={setTotal}
                />
                <Button
                  variant="success"
                  id="set-total"
                  onClick={() => {
                    //@ts-ignore
                    const total = setTotal.current.value;
                    updateTotal(selectedNode.id, total);
                  }}
                >
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
                </Button>
              </>
            )}
            {selectedNode.type === "dropdownNode" && (
              <>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Add new dropdown option..."
                    aria-label="Add new dropdown option..."
                    aria-describedby="option-add"
                    ref={newOption}
                  />
                  <Button
                    variant="success"
                    id="button-add"
                    onClick={() => {
                      //@ts-ignore
                      const option = newOption.current.value;
                      addDropdownOption(selectedNode.id, option);
                    }}
                  >
                    +
                  </Button>
                </InputGroup>

                <ListGroup style={{ maxHeight: "220px", overflowY: "scroll" }}>
                  <ListGroup.Item>
                    {selectedNode.data.options.map((option: string) => {
                      return (
                        <ListGroup.Item key={option}>
                          <Stack direction="horizontal">
                            <div className="col">{option}</div>
                            {option !== "N/A" && (
                              <div className="col-5 d-flex">
                                {/* <button
                                  className="btn btn-info ms-auto"
                                  type="button"
                                  onClick={() => editDropdownOption(option)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                    />
                                  </svg>
                                </button> */}
                                <Button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={() =>
                                    deleteDropdownOption(
                                      selectedNode.id,
                                      option
                                    )
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trash3"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                  </svg>
                                </Button>
                              </div>
                            )}
                          </Stack>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup.Item>
                </ListGroup>
              </>
            )}
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
