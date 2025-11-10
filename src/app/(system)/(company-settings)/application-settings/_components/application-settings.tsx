"use client";
import React, { useState } from "react";
import { Sketch, Wheel } from "@uiw/react-color";

function Demo() {
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [disableAlpha, setDisableAlpha] = useState(false);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sketch
          style={{ marginLeft: 20 }}
          color={hsva}
          disableAlpha={disableAlpha}
          onChange={(color) => {
            setHsva(color.hsva);
          }}
        />
        <Wheel
          style={{ marginLeft: 20 }}
          color={hsva}
          onChange={(color) => {
            setHsva(color.hsva);
          }}
        />
      </div>
      <button onClick={() => setDisableAlpha(!disableAlpha)}>
        disableAlpha={disableAlpha.toString()}
      </button>
    </div>
  );
}

export default Demo;
