import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { NodeResizer, NodeToolbar } from "reactflow";

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96];

const TextNode = ({ data, selected }) => {
  const [height, setHeight] = useState(20);
  const [fontSize, setFontSize] = useState(16);

  const observedDiv = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!observedDiv.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      if (observedDiv.current!.offsetHeight !== height) {
        setHeight(observedDiv.current!.offsetHeight);
      }
    });

    resizeObserver.observe(observedDiv.current);

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [height]);

  return (
    <>
      <NodeToolbar className="nav" align="center">
        <button
          className="nav-item btn btn-primary"
          onClick={() => {
            if (fontSizes.indexOf(fontSize) + 1 < fontSizes.length)
              setFontSize(fontSizes[fontSizes.indexOf(fontSize) + 1]);
          }}
        >
          +
        </button>
        <Dropdown className="nav-item">
          <Dropdown.Toggle variant="primary">{fontSize}</Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
            {fontSizes.map((size) => {
              return (
                <Dropdown.Item
                  onClick={() => {
                    setFontSize(size);
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
            if (fontSizes.indexOf(fontSize) - 1 >= 0)
              setFontSize(fontSizes[fontSizes.indexOf(fontSize) - 1]);
          }}
        >
          -
        </button>
      </NodeToolbar>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={20}
        minHeight={height}
      />
      <div
        className="text-center"
        ref={observedDiv}
        style={{ fontSize: fontSize }}
      >
        {data.label}
      </div>
    </>
  );
};

export default TextNode;
