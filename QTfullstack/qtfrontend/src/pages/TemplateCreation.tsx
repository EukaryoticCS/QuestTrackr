import React, { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  Node,
  BackgroundVariant,
  MiniMap,
  useNodesState,
  useReactFlow,
  applyNodeChanges,
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

const flowKey: string = "example-flow";
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
  onConnect: state.onConnect,
  onAdd: state.onAdd,
});

function TemplateCreation() {
  const { nodes, onNodesChange, onConnect, onAdd } = useStore(selector);
  const { setViewport, screenToFlowPosition } = useReactFlow();

  return (
    <div className="row min-vh-100 p-0">
      <div className="d-flex col-sm-auto py-0 m-0">
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
              position: { x: center.x, y: center.y },
              type: "shapeNode",
              data: { color: "#ffffff" },
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
              position: { x: center.x, y: center.y },
              type: "textNode",
              data: { label: "Input Text Here", textColor: "#ffffff" },
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
              position: { x: center.x, y: center.y },
              data: {
                img: "https://cdn.wikimg.net/en/zeldawiki/images/3/3a/LA_Shield_Sprite.png",
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
              position: { x: center.x, y: center.y },
              data: {},
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
              position: { x: center.x, y: center.y },
              data: { max: 20, textColor: "#ffffff", total: 20 },
              type: "numberNode",
              style: {
                fontSize: 15,
                height: 60,
                width: 220,
              },
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
              position: { x: center.x, y: center.y },
              data: {
                options: ["", "short", "meeeeeediummmm", "loooooooooooooooooooong"],
              },
              type: "dropdownNode",
              style: {
                fontSize: 15,
                height: 20,
                width: 20,
              },
            });
          }}
        />
      </div>
      <div className="col p-0 m-0">
        <ReactFlow
          minZoom={0.2}
          maxZoom={4}
          fitView
          nodes={nodes}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap nodeColor={nodeColor} zoomable pannable />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default TemplateCreation;
