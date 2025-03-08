import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  useReactFlow,
  useOnSelectionChange,
  Node,
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
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useTemplate } from "../hooks/useTemplate.tsx";
import { useCopyPaste } from "../hooks/useCopyPaste.tsx";
import TemplateSettings from "../components/TemplateSettings.tsx";
import NodeSettings from "../components/NodeSettings.tsx";
import {
  nodeColor,
  createShapeNode,
  createTextNode,
  createImageNode,
  createCheckboxNode,
  createNumberNode,
  createDropdownNode,
  createPercentageNode,
} from "../utils/nodeUtils.ts";

const nodeTypes = {
  shapeNode: ShapeNode,
  textNode: TextNode,
  imageNode: ImageNode,
  checkboxNode: CheckboxNode,
  numberNode: NumberNode,
  dropdownNode: DropdownNode,
  percentageNode: PercentageNode,
};

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
    deleteDropdownOption,
  } = useStore(selector);

  const { undo, redo } = useStore.temporal.getState();

  const [showTemplateSettings, setShowTemplateSettings] = React.useState(false);
  const [showNodeSettings, setShowNodeSettings] = React.useState(false);
  const [showSavedAlert, setShowSavedAlert] = React.useState(false);

  const { screenToFlowPosition } = useReactFlow();
  const { gameId, templateId } = useParams();

  const { details, loadTemplate, saveTemplate, updateDetails } = useTemplate(
    gameId!,
    templateId!
  );
  useCopyPaste(nodes, onAdd);

  const handleShowSavedAlert = () => {
    setShowSavedAlert(true);
    window.setTimeout(() => {
      setShowSavedAlert(false);
    }, 2000);
  };

  const updateNodeSettings = (node: Node) => {
    updateSelectedNode(node);
    setShowNodeSettings(true);
  };

  const onSave = useCallback(async () => {
    handleShowSavedAlert();
    await saveTemplate(nodes, sections);
  }, [nodes, sections, saveTemplate]);

  const onRestore = useCallback(async () => {
    const template = await loadTemplate();
    template.layout.forEach((node: Node) => {
      node.data.updateNodeSettings = updateNodeSettings;
    });
    restoreNodes(template.layout);
    restoreSections(template.sections);
  }, [loadTemplate, restoreNodes, restoreSections]);

  useEffect(() => {
    onRestore();
  }, [onRestore]);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length === 1) {
        updateSelectedNode(nodes[0]);
      }
    },
  });

  const handleSaveTemplateSettings = (
    title: string,
    bgColor: string,
    snapToGrid: boolean
  ) => {
    updateDetails({ title, bgColor, snapToGrid });
    setShowTemplateSettings(false);
    onSave();
  };

  const getNodePosition = () => {
    const reactFlowContainer = document.querySelector(".react-flow");
    const reactFlowBounds = reactFlowContainer?.getBoundingClientRect();

    return screenToFlowPosition({
      x: reactFlowBounds!.width * 0.5,
      y: reactFlowBounds!.height * 0.5,
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        // metaKey for Mac
        switch (event.key.toLowerCase()) {
          case "z":
            event.preventDefault();
            if (event.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case "y":
            event.preventDefault();
            redo();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  return (
    <div className="row min-vh-100 p-0 container-fluid">
      <div className="d-flex col-sm-auto py-0 pe-0 m-0">
        <TemplateTools
          onShapesClick={() =>
            onAdd(createShapeNode(getNodePosition(), updateNodeSettings))
          }
          onTextClick={() =>
            onAdd(createTextNode(getNodePosition(), updateNodeSettings))
          }
          onImageClick={() =>
            onAdd(createImageNode(getNodePosition(), updateNodeSettings))
          }
          onCheckboxClick={() =>
            onAdd(createCheckboxNode(getNodePosition(), updateNodeSettings))
          }
          onNumbersClick={() =>
            onAdd(createNumberNode(getNodePosition(), updateNodeSettings))
          }
          onDropdownClick={() =>
            onAdd(createDropdownNode(getNodePosition(), updateNodeSettings))
          }
          onPercentageClick={() =>
            onAdd(createPercentageNode(getNodePosition(), updateNodeSettings))
          }
          handleShowSavedAlert={onSave}
          handleShowTemplateSettings={() => setShowTemplateSettings(true)}
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

      <TemplateSettings
        show={showTemplateSettings}
        onHide={() => setShowTemplateSettings(false)}
        title={details.title}
        bgColor={details.bgColor}
        snapToGrid={details.snapToGrid}
        sections={sections}
        onSave={handleSaveTemplateSettings}
        onAddSection={addSection}
        onEditSection={renameSection}
        onDeleteSection={deleteSection}
        nodes={nodes}
        updateSection={updateSection}
      />

      <NodeSettings
        show={showNodeSettings}
        onHide={() => setShowNodeSettings(false)}
        selectedNode={selectedNode}
        updateImage={updateImage}
        updateTotal={updateTotal}
        addDropdownOption={addDropdownOption}
        deleteDropdownOption={deleteDropdownOption}
      />

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
