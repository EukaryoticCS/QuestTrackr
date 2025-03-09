import React from "react";
import { Dropdown } from "react-bootstrap";
import { NodeProps, NodeResizer, NodeToolbar } from "reactflow";

import useStore, { NodeData } from "../store.tsx";

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96];

const PercentageNode = ({ id, data, selected }: NodeProps<NodeData>) => {
  let sections = useStore((state) => state.sections);
  let sectionNodes = useStore((state) => state.getNodesBySection(data.section))

  const updateTextColor = useStore((state) => state.updateTextColor);
  const updateFontSize = useStore((state) => state.updateFontSize);
  const updateSection = useStore((state) => state.updateSection);

  const handleUpdateNodeSettings = () => {
    data.updateNodeSettings({ id, data, selected, type: "percentageNode" });
  };

  const {total, obtained} = sectionNodes.reduce((acc, node) => {
    switch (node.type) {
      case "checkboxNode":
        acc.total++;
        if (node.data.checked) {
          acc.obtained++;
        }
        break;
      case "dropdownNode":
        acc.total += node.data.options.length - 1;
        acc.obtained += node.data.options.indexOf(
          node.data.selected
        );
        break;
      case "numberNode":
        acc.total += node.data.total;
        acc.obtained += node.data.collected;
        break;
      default:
        break;
    }
    return acc;
  }, {total: 0, obtained: 0});

  const percentage = total === 0 ? 0 : (obtained / total) * 100;

  return (
    <>
      <NodeToolbar
        className="nav"
        align="center"
        isVisible={selected && data.selectable}
      >
        <button
          className="btn btn-primary"
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
        <Dropdown drop="down-centered" className="">
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
          className="btn btn-primary"
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
        // minHeight={height}
      />
      <div
        className="text-center"
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          border: "none",
          outline: "none",
          fontSize: data.fontSize,
          color: data.textColor,
        }}
      >
        {Math.floor(percentage)}%
      </div>
    </>
  );
};

export default PercentageNode;
