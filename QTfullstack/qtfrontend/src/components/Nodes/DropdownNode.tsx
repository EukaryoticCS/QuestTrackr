import React from "react";
import { NodeResizer } from "reactflow";

const DropdownNode = ({ data, selected }) => {
  const createDropdownItems = () => {
    let items:[Element];
    data.options.forEach((option) => items.push(<option value={option}/>))
    return items;
  }

  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={20}
        minHeight={20}
      />
      <select className="form-select">
        {createDropdownItems()}
      </select>
    </>
  );
};

export default DropdownNode;