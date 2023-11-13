import React from "react";
import { NodeResizer } from "reactflow";

const DropdownNode = ({ data, selected }) => {
  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={20}
        minHeight={20}
      />
      <div className="container form-group">
        <select className="form-select form-select-sm">
          {data.options.map((option: string) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DropdownNode;