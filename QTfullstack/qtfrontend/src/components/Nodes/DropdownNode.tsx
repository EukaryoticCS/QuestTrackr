import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const DropdownNode = ({ data, selected }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      <Dropdown drop="down-centered">
        <Dropdown.Toggle
          style={{
            minWidth:
              Math.max(...data.options.map((option) => option.length)) * 10, //This is CRAZY
          }}
          variant="primary"
        >
          {selectedOption}
        </Dropdown.Toggle>
        <Dropdown.Menu className="">
          {data.options.map((option: string) => {
            return (
              <Dropdown.Item
                key={option}
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
