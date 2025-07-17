import React from "react";
import UsageBlock from "../components/usage/UsageBlock";
import NFKOverwie from "../components/usage/NFKOverwie";
import { useSelector } from "react-redux";
import { getLandparcel } from "../store/slices/lagis";
import {
  NFKOverwieExtractor,
  usageBlockExtractor,
} from "../core/extractors/usagePageExtractors";
const UsagePage = ({ width = "100%", height = "100%", inStory = false }) => {
  const landparcel = useSelector(getLandparcel);
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      padding: "4px",
    };
  }
  return (
    <div className="h-full">
      <div className="h-[50%] mb-3 lg:mb-4">
        <UsageBlock dataIn={landparcel} extractor={usageBlockExtractor} />
      </div>
      <div className="h-[calc(50%-18px)]">
        <NFKOverwie dataIn={landparcel} extractor={NFKOverwieExtractor} />
      </div>
    </div>
  );
};

export default UsagePage;
