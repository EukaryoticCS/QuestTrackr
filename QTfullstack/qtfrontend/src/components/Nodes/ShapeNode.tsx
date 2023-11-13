import React from "react";
import { NodeResizer, NodeToolbar, Position } from "reactflow";

const ShapeNode = ({ data, selected }) => {
  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={20}
        minHeight={20}
      />
      <NodeToolbar position={Position.Top} align="center">
        
      </NodeToolbar>
      <div className="px-2 text-center"></div>
    </>
  );
};

export default ShapeNode;
