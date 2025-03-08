import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { NodeToolbar, NodeResizer } from "reactflow";
import useStore from "../store.tsx";

const CheckboxNode = ({ id, data, selected }) => {
  const [checked, setChecked] = useState(data.checked);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  let sections = useStore((state) => state.sections);
  const updateSection = useStore((state) => state.updateSection);
  const updateChecked = useStore((state) => state.updateChecked);

  // Handle window resize to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCheckboxClick = () => {
    updateChecked(id, !checked);
    setChecked(!checked);
  };

  const handleUpdateNodeSettings = () => {
    data.updateNodeSettings({ id, data, selected, type: "checkboxNode" });
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
        isVisible={selected}
        minWidth={20}
        minHeight={20}
      />
      <div
        className="text-center d-flex justify-content-center align-items-center"
        style={{
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
        onClick={handleCheckboxClick}
      >
        {isMobile ? (
          <div
            className={`d-flex justify-content-center align-items-center rounded ${
              checked ? "bg-success" : "bg-light border"
            }`}
            style={{
              width: "80%",
              height: "80%",
              minWidth: "30px",
              minHeight: "30px",
            }}
          >
            {checked && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="white"
                className="bi bi-check-lg"
                viewBox="0 0 16 16"
              >
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
              </svg>
            )}
          </div>
        ) : (
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxClick}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
    </>
  );
};

export default CheckboxNode;
