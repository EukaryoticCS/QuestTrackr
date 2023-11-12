import React from "react";
import { NodeResizer } from "reactflow";

const TextNode = ({ data, selected }) => {

  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={20}
        minHeight={20}
      />
      <div className="text-center">{data.label}</div>
    </>
  );
};

export default TextNode;
