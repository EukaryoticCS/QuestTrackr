import React, { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  Node,
  BackgroundVariant,
  MiniMap,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import TemplateTools from "../components/TemplateTools.tsx";
import shapeNode from "../components/Nodes/ShapeNode.tsx";
import TextNode from "../components/Nodes/TextNode.tsx";
import ImageNode from "../components/Nodes/ImageNode.tsx";
import CheckboxNode from "../components/Nodes/CheckboxNode.tsx";
import NumberNode from "../components/Nodes/NumberNode.tsx";
import DropdownNode from "../components/Nodes/DropdownNode.tsx";

const flowKey: string = "example-flow";
const getNodeId = () => `${+new Date()}`;
function nodeColor(node) {
  switch (node.type) {
    case 'shapeNode':
      return '#133C55'
    case 'textNode':
    case 'imageNode':
      return '#386FA4'
    case 'checkboxNode':
    case 'numberNode':
    case 'dropdownNode':
      return '#59A5D8'
    default:
      return '#FFFFFF'
  }
}

const nodeTypes = {
  shapeNode: shapeNode,
  textNode: TextNode,
  imageNode: ImageNode,
  checkboxNode: CheckboxNode,
  numberNode: NumberNode,
  dropdownNode: DropdownNode,
};

const initialNodes: Node[] = [
  // {
  //   id: "1",
  //   position: { x: 0, y: 0 },
  //   type: "shapeNode",
  //   data: {},
  //   style: {
  //     background: "#fff",
  //     border: "1px solid black",
  //     borderRadius: 15,
  //     fontSize: 12,
  //     zIndex: -1,
  //     height: 20,
  //     width: 40,
  //   },
  // },
  // {
  //   id: "2",
  //   position: { x: 100, y: 0 },
  //   type: "shapeNode",
  //   data: {},
  //   style: {
  //     background: "#fff",
  //     border: "1px solid black",
  //     borderRadius: 15,
  //     fontSize: 12,
  //     zIndex: -1,
  //     height: 20,
  //     width: 40,
  //   },
  // },
  // {
  //   id: "3",
  //   position: { x: 200, y: 0 },
  //   type: "shapeNode",
  //   data: {},
  //   style: {
  //     background: "#fff",
  //     border: "1px solid black",
  //     borderRadius: 15,
  //     fontSize: 12,
  //     zIndex: -1,
  //     height: 20,
  //     width: 40,
  //   },
  // },
  // {
  //   id: "4",
  //   position: { x: 300, y: 0 },
  //   data: { label: "Input Text Here" },
  //   type: "textNode",
  //   style: {
  //     fontSize: 15,
  //     height: 20,
  //     width: 40,
  //   },
  // },
  // {
  //   id: "5",
  //   position: { x: 400, y: 0 },
  //   data: {
  //     img: "https://cdn.wikimg.net/en/zeldawiki/images/3/3a/LA_Shield_Sprite.png",
  //   },
  //   type: "imageNode",
  //   style: {
  //     fontSize: 15,
  //     height: 20,
  //     width: 40,
  //   },
  // },
  // {
  //   id: "6",
  //   position: { x: 500, y: 0 },
  //   data: {},
  //   type: "checkboxNode",
  //   style: {
  //     fontSize: 15,
  //     height: 15,
  //     width: 15,
  //   },
  // },
  // {
  //   id: "7",
  //   position: { x: 600, y: 0 },
  //   data: { max: 20 },
  //   type: "numberNode",
  //   style: {
  //     fontSize: 15,
  //     height: 70,
  //     width: 190,
  //   },
  // },
  // {
  //   id: "8",
  //   position: { x: 600, y: 0 },
  //   data: {
  //     options: [
  //       "",
  //       "Bow and Arrow",
  //       "Bow with Fire Arrows",
  //       "Bow with Ice Arrows",
  //       "Bow with Light Arrows",
  //     ],
  //   },
  //   type: "dropdownNode",
  //   style: {
  //     fontSize: 15,
  //     height: 20,
  //     width: 20,
  //   },
  // },
];

function TemplateCreation() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [editState, setEditState] = useState({
    id: "",
    background: "",
    label: "",
    color: "",
  });
  const { setViewport, screenToFlowPosition } = useReactFlow();
  const [rfInstance, setrfInstance] = useState<any>(null);
  

  const onSave = useCallback(() => {
    if (rfInstance != null) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey) || "{}");

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(
    (newNode) => {
      const reactFlowContainer = document.querySelector(".react-flow");
      const reactFlowBounds = reactFlowContainer?.getBoundingClientRect();

      if (!reactFlowBounds) {
        return;
      }

      const center = screenToFlowPosition({
        x: reactFlowBounds.width * 0.5,
        y: reactFlowBounds.height * 0.5
      });

      newNode.position = center;
      console.log(newNode);

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, screenToFlowPosition]
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
        <TemplateTools
          onShapesClick={() =>
            onAdd({
              id: getNodeId(),
              position: { x: 0, y: 0 },
              type: "shapeNode",
              data: {},
              style: {
                background: "#fff",
                border: "1px solid black",
                borderRadius: 15,
                fontSize: 12,
                zIndex: -1,
                height: 20,
                width: 40,
              },
            })
          }
          onTextClick={() =>
            onAdd({
              id: getNodeId(),
              position: { x: 0, y: 0 },
              type: "textNode",
              data: { label: "Input Text Here" },
              style: {
                fontSize: 15,
                height: 20,
                width: 40,
              },
            })
          }
          onImageClick={() =>
            onAdd({
              id: getNodeId(),
              position: { x: 0, y: 0 },
              data: {
                img: "https://cdn.wikimg.net/en/zeldawiki/images/3/3a/LA_Shield_Sprite.png",
              },
              type: "imageNode",
              style: {
                fontSize: 15,
                height: 20,
                width: 40,
              },
            })
          }
          onCheckboxClick={() =>
            onAdd({
              id: getNodeId(),
              position: { x: 0, y: 0 },
              data: {},
              type: "checkboxNode",
              style: {
                fontSize: 15,
                height: 15,
                width: 15,
              },
            })
          }
          onNumbersClick={() =>
            onAdd({
              id: getNodeId(),
              position: { x: 0, y: 0 },
              data: { max: 20 },
              type: "numberNode",
              style: {
                fontSize: 15,
                height: 70,
                width: 190,
              },
            })
          }
          onDropdownClick={() =>
            onAdd({
              id: getNodeId(),
              position: { x: 0, y: 0 },
              data: {
                options: [
                  "",
                  "Option 1",
                  "Option 2",
                  "Option 3",
                ],
              },
              type: "dropdownNode",
              style: {
                fontSize: 15,
                height: 20,
                width: 20,
              },
            })
          }
        />
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
          <MiniMap nodeColor={nodeColor} zoomable pannable/>
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
