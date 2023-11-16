import React, { useState } from "react";
import { NodeResizer, NodeToolbar, Position, NodeProps } from "reactflow";

import useStore, { NodeData } from "../store.tsx";

const ShapeNode = ({ id, data, selected }: NodeProps<NodeData>) => {
  const updateNodeColor = useStore((state) => state.updateNodeColor);

  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={20}
        minHeight={20}
      />
      <NodeToolbar position={Position.Top} align="center">
        <div className="form form-control">
          <input
            defaultValue={data.color}
            type="color"
            onChange={(e) => updateNodeColor(id, e.target.value)}
          />
        </div>
      </NodeToolbar>
      <div className="px-2 text-center" style={{ backgroundColor: data.color, width: "100%", height: "100%", borderRadius: 15}} ></div>
    </>
  );
};

export default ShapeNode;
