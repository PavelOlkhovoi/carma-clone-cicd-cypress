import { Button } from "antd";
import React from "react";

const Toolbar = () => {
  return (
    <div className="w-full flex gap-2">
      <Button>Text</Button>
      <Button>Zeichnung</Button>
    </div>
  );
};

export default Toolbar;
