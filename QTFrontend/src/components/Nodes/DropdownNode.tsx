import React, { useState, useCallback } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { NodeToolbar, NodeResizer, useReactFlow } from "reactflow";
import useStore from "../store.tsx";

const DropdownNode = ({ id, data, selected }) => {
  const [selectedOption, setSelectedOption] = useState(data.selected);
  const [isInteractionEnabled, setIsInteractionEnabled] = useState(false);
  const isTrackingMode = !data.selectable;
  let sections = useStore((state) => state.sections);
  const updateSection = useStore((state) => state.updateSection);
  const updateSelected = useStore((state) => state.updateSelected);

  // Double-click handler for template creation mode
  const handleDoubleClick = useCallback(
    (e) => {
      if (!isTrackingMode) {
        e.stopPropagation(); // Prevent double-click from triggering other events
        setIsInteractionEnabled(true);
      }
    },
    [isTrackingMode]
  );

  const handleUpdateNodeSettings = () => {
    data.updateNodeSettings({ id, data, selected, type: "dropdownNode" });
  };

  const handleSelectChange = (option) => {
    // In tracking mode or when interaction is enabled in creation mode
    if (isTrackingMode || isInteractionEnabled) {
      setSelectedOption(option);
      updateSelected(id, option);
      setIsInteractionEnabled(false); // Reset interaction state after selection in creation mode
    }
  };

  return (
    <>
      <NodeToolbar
        className="nav"
        align="center"
        isVisible={selected && data.selectable}
      >
        <Dropdown drop="down-centered" style={{ zIndex: 50000 }}>
          <Dropdown.Toggle variant="primary">{data.section}</Dropdown.Toggle>
          <Dropdown.Menu>
            {sections.map((option: string) => {
              return (
                <Dropdown.Item
                  key={option}
                  onClick={() => {
                    updateSection(id, option);
                  }}
                >
                  {option}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <button className="btn btn-primary" onClick={handleUpdateNodeSettings}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-gear"
            viewBox="0 0 16 16"
          >
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
          </svg>
        </button>
      </NodeToolbar>
      <NodeResizer
        color="#ff0071"
        isVisible={selected && data.selectable}
        minWidth={
          Math.max(...data.options.map((option) => option.length)) * 8 + 40
        }
        minHeight={40}
      />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "100%" }}
        onDoubleClick={handleDoubleClick}
      >
        <Form.Select
          value={selectedOption}
          onChange={(e) => handleSelectChange(e.target.value)}
          style={{
            width: "90%",
            height: "auto",
            fontSize: "16px",
            padding: "8px",
            borderRadius: "8px",
            cursor: isTrackingMode || isInteractionEnabled ? "pointer" : "move",
            pointerEvents:
              isTrackingMode || isInteractionEnabled ? "auto" : "none",
          }}
        >
          {data.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>
      </div>
      {!isTrackingMode && !isInteractionEnabled && selected && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
          }}
        >
          Double-click to interact
        </div>
      )}
    </>
  );
};

export default DropdownNode;
