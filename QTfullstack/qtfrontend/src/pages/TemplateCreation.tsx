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
import SectionNode from "../components/SectionNode.tsx";
import TextNode from "../components/TextNode.tsx";
import ImageNode from "../components/ImageNode.tsx";
import TemplateTools from "../components/TemplateTools.tsx";
import CheckboxNode from "../components/CheckboxNode.tsx";


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
      border: "1px solid black",
      fontSize: 15,
      height: 20,
      width: 40
    },
  },
  {
    id: "5",
    position: { x: 300, y: 0 },
    data: { label: "asdfasdf" },
    type: "imageNode",
    style: {
      border: "1px solid black",
      fontSize: 15,
      height: 20,
      width: 40
    },
  },
  {
    id: "6",
    position: { x: 300, y: 0 },
    data: { label: "asdfasdf" },
    type: "checkboxNode",
    style: {
      fontSize: 15,
      height: 15,
      width: 15,
    },
  },
];

const nodeTypes = { sectionNode: SectionNode, textNode: TextNode, imageNode: ImageNode, checkboxNode: CheckboxNode };

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
