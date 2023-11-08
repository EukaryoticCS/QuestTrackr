import React from "react";
import { NodeResizer } from "reactflow";

const SectionBox = ({ data, selected }) => {


  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <div className="px-2">{data.label}</div>
    </>
  );
};

export default SectionBox;
