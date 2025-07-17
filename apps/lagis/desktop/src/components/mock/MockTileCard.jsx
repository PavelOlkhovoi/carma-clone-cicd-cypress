import React, { useRef, useEffect, useState } from "react";
import { Card } from "antd";

export default function MockTileCard({ style, title }) {
  const cardRef = useRef();
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    if (cardRef.current) {
      setDimensions(cardRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <Card style={style} ref={cardRef}>
      {title}
      <p style={{ color: "lightgrey" }}>
        Width: {Math.round(dimensions.width * 10) / 10}px, Height:{" "}
        {Math.round(dimensions.height * 10) / 10}px
      </p>
    </Card>
  );
}
