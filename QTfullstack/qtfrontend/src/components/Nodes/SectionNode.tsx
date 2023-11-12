import React from "react";
import { NodeResizer } from "reactflow";

const SectionNode = ({ data, selected }) => {


  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={20}
        minHeight={20}
      />
      <div className="px-2 text-center"></div>
    </>
  );
};

export default SectionNode;
