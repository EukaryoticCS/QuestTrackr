import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { NodeProps, NodeToolbar } from "reactflow";
import useStore, { NodeData } from "../store.tsx";

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96];

const NumberNode = ({ id, data, selected }: NodeProps<NodeData>) => {
  const [collected, setCollected] = useState(data.collected);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  let sections = useStore((state) => state.sections);

  const updateTextColor = useStore((state) => state.updateTextColor);
  const updateSection = useStore((state) => state.updateSection);
  const updateCollected = useStore((state) => state.updateCollected);
  const updateFontSize = useStore((state) => state.updateFontSize);

  // Handle window resize to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUpdateNodeSettings = () => {
    data.updateNodeSettings({ id, data, selected, type: "numberNode" });
  };

  const handleIncrement = () => {
    if (collected < data.total) {
      const newCollected = collected + 1;
      setCollected(newCollected);
      updateCollected(id, newCollected);
    }
  };

  const handleDecrement = () => {
    if (collected > 0) {
      const newCollected = collected - 1;
      setCollected(newCollected);
      updateCollected(id, newCollected);
    }
  };

  return (
    <>
      <NodeToolbar
        className="nav"
        align="center"
        isVisible={selected && data.selectable}
      >
        <button
          className="nav-item btn btn-primary"
          onClick={() => {
            if (fontSizes.indexOf(data.fontSize) + 1 < fontSizes.length)
              updateFontSize(
                id,
                fontSizes[fontSizes.indexOf(data.fontSize) + 1]
              );
          }}
        >
          +
        </button>
        <Dropdown className="nav-item">
          <Dropdown.Toggle variant="primary">{data.fontSize}</Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
            {fontSizes.map((size) => {
              return (
                <Dropdown.Item
                  key={size}
                  onClick={() => {
                    updateFontSize(id, size);
                  }}
                >
                  {size}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <button
          className="nav-item btn btn-primary"
          onClick={() => {
            if (fontSizes.indexOf(data.fontSize) - 1 >= 0)
              updateFontSize(
                id,
                fontSizes[fontSizes.indexOf(data.fontSize) - 1]
              );
          }}
        >
          -
        </button>
        <input
          className="form-control form-control-color"
          defaultValue={data.textColor}
          type="color"
          onChange={(e) => updateTextColor(id, e.target.value)}
        />
        <Dropdown className="nav-item">
          <Dropdown.Toggle variant="primary">{data.section}</Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
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
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          width: "100%",
          height: "100%",
          color: data.textColor,
          fontSize: data.fontSize,
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
          <div className="d-flex justify-content-center align-items-center mb-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleDecrement}
              className="me-2 d-flex justify-content-center align-items-center"
              style={{ width: "30px", height: "30px", padding: "0" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dash"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            </Button>
            <div className="text-center" style={{ minWidth: "60px" }}>
              {collected}/{data.total}
            </div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleIncrement}
              className="ms-2 d-flex justify-content-center align-items-center"
              style={{ width: "30px", height: "30px", padding: "0" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </Button>
          </div>
          <div className="progress w-75" style={{ height: "10px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${(collected / data.total) * 100}%` }}
              aria-valuenow={(collected / data.total) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NumberNode;
