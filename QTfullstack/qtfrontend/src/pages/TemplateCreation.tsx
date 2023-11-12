import React, { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  Node,
  BackgroundVariant,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import SectionNode from "../components/Nodes/SectionNode.tsx";
import TextNode from "../components/Nodes/TextNode.tsx";
import ImageNode from "../components/Nodes/ImageNode.tsx";
import TemplateTools from "../components/TemplateTools.tsx";
import CheckboxNode from "../components/Nodes/CheckboxNode.tsx";
import NumberNode from "../components/Nodes/NumberNode.tsx";
import DropdownNode from "../components/Nodes/DropdownNode.tsx";


const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "sectionNode",
    data: { label: "Text:" },
    style: {
      background: "#fff",
      border: "1px solid black",
      borderRadius: 15,
      fontSize: 12,
      zIndex: -1,
      height: 20,
      width: 40
    },
  },
  {
    id: "2",
    position: { x: 100, y: 0 },
    type: "sectionNode",
    data: { label: "Text:" },
    style: {
      background: "#fff",
      border: "1px solid black",
      borderRadius: 15,
      fontSize: 12,
      zIndex: -1,
      height: 20,
      width: 40
    },
  },
  {
    id: "3",
    position: { x: 200, y: 0 },
    type: "sectionNode",
    data: { label: "Text:" },
    style: {
      background: "#fff",
      border: "1px solid black",
      borderRadius: 15,
      fontSize: 12,
      zIndex: -1,
      height: 20,
      width: 40
    },
  },
  {
    id: "4",
    position: { x: 300, y: 0 },
    data: { label: "asdfasdf" },
    type: "textNode",
    style: {
      fontSize: 15,
      height: 20,
      width: 40
    },
  },
  {
    id: "5",
    position: { x: 400, y: 0 },
    data: { img: "https://cdn.wikimg.net/en/zeldawiki/images/3/3a/LA_Shield_Sprite.png" },
    type: "imageNode",
    style: {
      fontSize: 15,
      height: 20,
      width: 40
    },
  },
  {
    id: "6",
    position: { x: 500, y: 0 },
    data: { label: "" },
    type: "checkboxNode",
    style: {
      fontSize: 15,
      height: 15,
      width: 15,
    },
  },
  {
    id: "7",
    position: { x: 600, y: 0 },
    data: { label: "", max: 20 },
    type: "numberNode",
    style: {
      fontSize: 15,
      height: 70,
      width: 190,
    },
  },
  {
    id: "8",
    position: { x: 600, y: 0 },
    data: { label: "", max: 20 },
    type: "dropdownNode",
    style: {
      fontSize: 15,
      height: 20,
      width: 20,
    },
  },
];

const nodeTypes = { sectionNode: SectionNode, textNode: TextNode, imageNode: ImageNode, checkboxNode: CheckboxNode, numberNode: NumberNode, dropdownNode: DropdownNode };

function TemplateCreation() {
  const [nodes, setNodes] = useState(initialNodes);
  const [editState, setEditState] = useState({
    id: "",
    background: "",
    label: "",
    color: "",
  });

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdit = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === editState.id) {
          node.style = {
            ...node.style,
            background: editState.background,
            color: editState.color,
          };
          node.data = {
            ...node.data,
            label: editState.label,
          };
        }
        return node;
      })
    );
  };

  return (
    <div className="row min-vh-100 p-0">
      <div className="d-flex col-sm-auto py-0 m-0">
        <TemplateTools />
      </div>
      <div className="col-sm-10 p-0 m-0">
        <ReactFlow
          defaultNodes={initialNodes}
          minZoom={0.2}
          maxZoom={4}
          fitView
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
        >
          <Background variant={BackgroundVariant.Dots} />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <div className="col-sm-1 p-0 m-0">
        Id:{" "}
        <input
          type="text"
          onChange={(e) => {
            setEditState((prev) => ({ ...prev, id: e.target.value }));
          }}
        />
        Label:{" "}
        <input
          type="text"
          onChange={(e) => {
            setEditState((prev) => ({ ...prev, label: e.target.value }));
          }}
        />
        Color:{" "}
        <input
          type="color"
          onChange={(e) => {
            setEditState((prev) => ({ ...prev, background: e.target.value }));
          }}
        />
        Text Color:{" "}
        <input
          type="color"
          onChange={(e) => {
            setEditState((prev) => ({ ...prev, color: e.target.value }));
          }}
        />
        <button onClick={onEdit}>Edit node</button>
      </div>
    </div>
  );
}

export default TemplateCreation;
