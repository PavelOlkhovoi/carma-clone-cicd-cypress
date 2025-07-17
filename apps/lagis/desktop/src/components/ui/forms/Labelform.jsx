import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
const Labelform = ({ name, customStyle = { fontSize: "12px" } }) => {
  return (
    <span style={customStyle}>
      {name}{" "}
      <InfoCircleOutlined
        style={{
          fontSize: "12px",
          color: "#858585",
          marginLeft: "1px",
          fontWeight: "normal",
        }}
      />
    </span>
  );
};

export default Labelform;
