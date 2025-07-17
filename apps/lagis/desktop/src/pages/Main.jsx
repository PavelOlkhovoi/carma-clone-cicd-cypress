import React from "react";
import SidebarMenu from "../components/navigation/SidebarMenu";
import UserBar from "../components/header/UserBar";
import Overview from "./Overview";
import FooterSection from "../components/navigation/FooterSection";
const MainLayout = ({ width = "100%", height = "100%", inStory = false }) => {
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
      <div className="flex gap-4">
        <div>
          <SidebarMenu />
        </div>
        <div className="flex flex-col w-full">
          <div className="pb-1">
            <UserBar />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Overview />
          </div>
          <div style={{ marginTop: "auto" }}>
            <FooterSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
