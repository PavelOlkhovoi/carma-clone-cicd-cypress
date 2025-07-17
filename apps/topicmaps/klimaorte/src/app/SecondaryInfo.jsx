import React, { useContext } from "react";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";
import Orte from "./secondaryInfo/Orte";
import Zwischenstopps from "./secondaryInfo/Zwischenstopps";
import Routen from "./secondaryInfo/Routen";

const InfoPanel = () => {
  const { selectedFeature } = useContext(FeatureCollectionContext);

  switch (selectedFeature?.featuretype) {
    case "ort":
      return <Orte />;
    case "zwischenstopp":
      return <Zwischenstopps />;
    case "route":
      return <Routen />;
    default:
      return null;
  }
};
export default InfoPanel;
