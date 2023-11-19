import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { NodeResizer } from "reactflow";

const DropdownNode = ({ data, selected }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      <NodeResizer
        color="ff0071"
        isVisible={selected}
        minWidth={20}
        minHeight={20}
      />
        <Dropdown drop="down-centered">
          <Dropdown.Toggle variant="primary">{selectedOption}</Dropdown.Toggle>
          <Dropdown.Menu className="">
            {data.options.map((option: string) => {
              return (
                <Dropdown.Item
                  onClick={() => {
                    setSelectedOption(option);
                  }}
                >
                  {option}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
    </>
  );
};

export default DropdownNode;
