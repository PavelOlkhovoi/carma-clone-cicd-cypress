import { md5FetchJSON, md5FetchText } from "react-cismap/tools/fetching";
import { getGazDataForTopicIds } from "react-cismap/tools/gazetteerHelper";

import { host } from "./constants";

export const getGazData = async (setGazData) => {
  const prefix = "GazData";
  const sources = {};

  sources.pois = await md5FetchText(prefix, host + "/data/pois.json");
  sources.adressen = await md5FetchText(prefix, host + "/data/adressen.json");
  sources.bezirke = await md5FetchText(prefix, host + "/data/bezirke.json");
  sources.quartiere = await md5FetchText(prefix, host + "/data/quartiere.json");

  const gazData = getGazDataForTopicIds(sources, [
    "pois",
    "bezirke",
    "quartiere",
    "adressen",
  ]);

  setGazData(gazData);
};

export const getPOIColors = async (setPoiColors) => {
  md5FetchJSON("poi_colors", host + "/data/poi.farben.json").then((data) => {
    setPoiColors(data);
  });
};
