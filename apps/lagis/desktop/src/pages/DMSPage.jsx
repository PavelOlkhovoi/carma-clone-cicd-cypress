import DmsBlock from "../components/dms/DmsBlock";
import { dmsPageExtractor } from "../core/extractors/dmsPageExtractor";
import { getLandparcel } from "../store/slices/lagis";
import { useSelector } from "react-redux";
const DMSPage = ({ width = "100%", height = "100%", inStory = false }) => {
  const landparcel = useSelector(getLandparcel);
  let storyStyle = {};
  if (inStory) {
    storyStyle = {
      borderStyle: "dotted",
      borderWidth: "1px solid",
      background: "gray",
      padding: "4px",
    };
  }
  return (
    <div
      style={{
        ...storyStyle,
        backgroundColor: "#F1F1F1",
      }}
      className="h-full"
    >
      <div className="h-[calc(100%-1px)]">
        <DmsBlock dataIn={landparcel} extractor={dmsPageExtractor} />
      </div>
    </div>
  );
};

export default DMSPage;
