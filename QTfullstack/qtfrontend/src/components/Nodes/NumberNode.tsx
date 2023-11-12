import React, { useState } from "react";
import { NodeResizer } from "reactflow";

const NumberNode = ({ data, selected }) => {
  const [collected, setCollected] = useState(0);

  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={190}
        minHeight={70}
      />
      <div className="container text-center form-group">
        <div className="row">
          <div className="col">Collected:</div>
          <div className="col">Remaining:</div>
        </div>
        <div className="row">
          <input
            className="col form-control"
            type="text"
            onChange={(e) =>
              setCollected(
                !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : 0
              )
            }
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
