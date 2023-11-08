import React, { useState } from "react";
import { Sketch } from "@uiw/react-color";

const ColorPicker = () => {
  const [hex, setHex] = useState("#d0021b");
  return (
    <div>
      <h1>{hex}</h1>
      <Sketch
        color={hex}
        onChange={(color) => {
          setHex(color.hex);
        }}
      />
    </div>
  );
}

export default ColorPicker;