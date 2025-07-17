import { useContext } from "react";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";

const LogSelection = () => {
  const { selectedFeature } = useContext(FeatureCollectionContext);
  console.log("selectedFeature.properties", selectedFeature?.properties);

  return <div></div>;
};

export default LogSelection;
