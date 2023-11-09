import React from "react";
import { NodeResizer } from "reactflow";

const ImageNode = ({ data, selected }) => {
  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={20}
        minHeight={20}
      />
      <div>{data.label}</div>
    </>
  );
};

export default ImageNode;
