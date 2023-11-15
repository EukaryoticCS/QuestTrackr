import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { NodeResizer, NodeToolbar } from "reactflow";

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96]

const NumberNode = ({ data, selected }) => {
  const [collected, setCollected] = useState(0);
  const [fontSize, setFontSize] = useState(16);

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
        minWidth={220}
        minHeight={60}
      />
      <div className="container text-center form-group" style={{fontSize: fontSize}}>
        <div className="row">
          <div className="col">Collected:</div>
          <div className="col">Remaining:</div>
        </div>
        <div className="row" style={{height:fontSize, color:"inherit"}}>
          <input
            className="col"
            type="text"
            onChange={(e) =>
              setCollected(
                !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : 0
              )
            }
            style={{fontSize:fontSize}}
          />
          <div className="col">
            {collected > data.max ? 0 : data.max - collected}
          </div>
        </div>
      </div>
    </>
  );
};

export default NumberNode;
