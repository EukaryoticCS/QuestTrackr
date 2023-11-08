import React from "react";
import { NodeResizer } from "reactflow";

const TextBox = ({ data, selected }) => {

  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <div>{data.label}</div>
    </>
  );
};

export default TextBox;
