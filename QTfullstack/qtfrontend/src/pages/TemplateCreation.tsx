import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
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
import { Button, Modal, Offcanvas } from "react-bootstrap";

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

const selector = (state) => ({
  nodes: state.nodes,
  onNodesChange: state.onNodesChange,
  onAdd: state.onAdd,
  restoreNodes: state.restoreNodes,
});

function TemplateCreation() {
  const { nodes, onNodesChange, onAdd, restoreNodes } = useStore(selector);
  const [details, setDetails] = useState({
    _id: "",
    title: "",
    bgColor: "",
    author: "",
    layout: [],
    sections: "",
  });
  const [showTemplateSettings, setShowTemplateSettings] = useState(false);
  const [showNodeSettings, setShowNodeSettings] = useState(false);
  const { screenToFlowPosition } = useReactFlow();

  const { gameId, templateId } = useParams();

  let title = useRef(null);
  let bgColor = useRef(null);
  const handleCloseTemplateSettings = () => setShowTemplateSettings(false);
  const handleShowTemplateSettings = () => setShowTemplateSettings(true);
  const handleSaveChanges = () => {
    setDetails({
      ...details,
      bgColor: bgColor.current!.value,
      title: title.current!.value,
    });
    setShowTemplateSettings(false);
  };
  const handleHideNodeSettings = () => setShowNodeSettings(false);
  const toggleShowNodeSettings = (node) => {
    setShowNodeSettings((s) => !s);
  };

  useEffect(() => {
    async function getTemplate() {
      const response = await axios.get(
        `http://localhost:5000/api/v1/games/${gameId}/templates/${templateId}`
      );
      setDetails(response.data.template);
    }
    getTemplate();
  }, []);

  const onSave = useCallback(async () => {
    const nodeList = nodes.map((node) => ({
      ...node,
      selected: false,
    }));
    const response = await axios.put(
      `http://localhost:5000/api/v1/games/${gameId}/templates`,
      {
        templateData: {
          _id: templateId,
          title: details.title,
          bgColor: details.bgColor,
          author: details.author,
          sections: [],
          layout: nodeList,
        },
      }
    );
  }, [
    nodes,
    templateId,
    gameId,
    details.author,
    details.title,
    details.bgColor,
  ]);

  const startRestore = useMemo(async () => {
    restoreNodes(details.layout);
  }, [restoreNodes, details]);

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
                openNodeSettings: toggleShowNodeSettings,
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
                textColor: "#000000",
                text: "Input Text Here",
                selectable: true,
              },
              style: {
                fontSize: 15,
                height: 30,
                width: 150,
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
              data: { selectable: true },
              type: "checkboxNode",
              style: {
                fontSize: 15,
                height: 15,
                width: 15,
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
              data: { textColor: "#ffffff", total: 20, selectable: true },
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
                  "short",
                  "meeeeeediummmm",
                  "loooooooooooooooooooong",
                ],
                selectable: true,
              },
              type: "dropdownNode",
            });
          }}
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
      <div className="col-1 p-0 m-0">
        <button onClick={onSave}>Save</button>
        <button onClick={onRestore}>Restore</button>
        <button onClick={toggleShowNodeSettings}>Node Settings</button>
      </div>

      <Modal
        show={showTemplateSettings}
        onHide={handleCloseTemplateSettings}
        centered
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
              />
            </div>
            <div className="form-group">
              <label htmlFor="bgcolor">Background color:</label>
              <input
                type="color"
                name="bgColor"
                defaultValue={details.bgColor}
                ref={bgColor}
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
        style={{ textShadow: "none" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="h1 fw-bold" style={{ textShadow: "none" }}>
              Node Settings
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>Hello World</Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default TemplateCreation;
