import React, { useRef, useEffect, useState } from "react";
import { Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function MockCard({ style, title }) {
  const cardRef = useRef();
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    if (cardRef.current) {
      setDimensions(cardRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <Card
      style={style}
      ref={cardRef}
      title={
        <span>
          <FontAwesomeIcon icon={faBars} /> {title}
        </span>
      }
      size="small"
      hoverable={false}
      shadow={true}
    >
      <p style={{ color: "lightgrey" }}>
        Width: {Math.round(dimensions.width * 10) / 10}px, Height:{" "}
        {Math.round(dimensions.height * 10) / 10}px
      </p>
    </Card>
  );
}
