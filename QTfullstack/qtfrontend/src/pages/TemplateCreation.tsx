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
import SectionBox from "../components/SectionBox.tsx";
import TextBox from "../components/TextBox.tsx";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Hello" },
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: "World" },
  },
  {
    id: "3",
    position: { x: 300, y: 300 },
    type: "sectionBox",
    data: { label: "Text:" },
    style: {
      background: "#fff",
      border: "1px solid black",
      borderRadius: 15,
      fontSize: 12,
      zIndex: -1
    },
  },
  {
    id: "4",
    position: { x:100, y: 200},
    data: {label: "asdfasdf"},
    type: "textBox",
    style: {
      border: "1px solid black",
      fontSize: 15,
    }
  }
];

const nodeTypes = { sectionBox: SectionBox, textBox: TextBox };

function TemplateCreation() {
  const [nodes, setNodes] = useState(initialNodes);
  const [editState, setEditState] = useState({id: "", background: "", label: "", color: ""})

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdit = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === editState.id) {
          node.style = { ...node.style, background: editState.background, color: editState.color}
          node.data = {
            ...node.data,
            label: editState.label
          };
        }

        return node;
      })
    );
  };

  return (
    <div style={{ height: "95vh" }}>
      <ReactFlow
        defaultNodes={initialNodes}
        minZoom={0.2}
        maxZoom={4}
        fitView
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={[20, 20]}
      >
        <Background variant={BackgroundVariant.Dots}/>
        <MiniMap />
        <Controls />
      </ReactFlow>

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

  );
}

export default TemplateCreation;
