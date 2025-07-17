import React from "react";
import { Row, Col } from "antd";
import SidebarMenu from "../../components/navigation/SidebarMenu";
import UserBar from "../../components/header/UserBar";
import FooterSection from "../../components/navigation/FooterSection";
import DMSPage from "../DMSPage";
const DMSLayout = ({ width = "100%", height = "100%", inStory = false }) => {
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px",
      borderColor: "#ddd",
    };
  }
  return (
    <div
      style={{
        ...storyStyle,
        background: "#F1F1F1",
      }}
      className="pr-4 w-full"
    >
      <div className="flex gap-4 h-screen">
        <div>
          <SidebarMenu />
        </div>
        <div className="flex flex-col w-full">
          <div className="pb-1">
            <UserBar />
          </div>
          <div className="flex flex-col w-full h-full">
            <DMSPage />
          </div>
          <div style={{ marginTop: "auto" }}>
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DMSLayout;
