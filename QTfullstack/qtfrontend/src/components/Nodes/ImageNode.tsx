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
      <img alt="" src={data.img} style={{width: "100%", height: "100%"}}/>
    </>
  );
};

export default ImageNode;
