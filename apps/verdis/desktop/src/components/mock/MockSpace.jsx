import React, { useRef, useEffect, useState } from "react";

export default function MockSpace({ style, title }) {
  const cardRef = useRef();
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    if (cardRef.current) {
      setDimensions(cardRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",

        ...style,
        borderStyle: "dotted",
        borderWidth: "1px solid",
        borderColor: "lightseagreen",
      }}
      ref={cardRef}
    >
      {title}{" "}
      <span style={{ color: "lightgrey" }}>
        (Width: {Math.round(dimensions.width * 10) / 10}px, Height:{" "}
        {Math.round(dimensions.height * 10) / 10}px)
      </span>
    </div>
  );
}
