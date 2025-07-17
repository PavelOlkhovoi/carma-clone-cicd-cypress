import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent.js";
import "react-cismap/topicMaps.css";
import "leaflet/dist/leaflet.css";
import { Card } from "antd";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { flaechen } from "../../stories/_data/rathausKassenzeichenfeatureCollection";
import { FeatureCollectionDisplay } from "react-cismap";
const mockExtractor = (input) => {
  return {
    homeCenter: [51.27225612927373, 7.199918031692506],
    homeZoom: 16,
    featureCollection: flaechen,
  };
};

const Map = ({
  dataIn,
  extractor = mockExtractor,
  width = 400,
  height = 500,
}) => {
  const data = extractor(dataIn);
  const padding = 5;
  const headHeight = 37;
  const cardRef = useRef(null);
  const [mapWidth, setMapWidth] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);

  useEffect(() => {
    setMapWidth(cardRef?.current?.offsetWidth);
    setMapHeight(cardRef?.current?.offsetHeight);

    const setSize = () => {
      setMapWidth(cardRef?.current?.offsetWidth);
      setMapHeight(cardRef?.current?.offsetHeight);
    };

    window.addEventListener("resize", setSize);

    console.log("xxx first load", data.featureCollection);

    return () => window.removeEventListener("resize", setSize);
  }, []);

  return (
    <Card
      size="small"
      hoverable={false}
      title={<span>Karte</span>}
      style={{
        width: width,
        height: height,
      }}
      bodyStyle={{ padding }}
      headStyle={{ backgroundColor: "white" }}
      type="inner"
      ref={cardRef}
    >
      <TopicMapContextProvider appKey="verdis-desktop.map">
        <TopicMapComponent
          mapStyle={{
            width: mapWidth - 2 * padding,
            height: mapHeight - 2 * padding - headHeight,
          }}
          homeZoom={data.homeZoom}
          homeCenter={data.homeCenter}
          gazData={[]}
          gazetteerSearchControl={false}
          hamburgerMenu={false}
          fullScreenControl={false}
        >
          <FeatureCollectionDisplay
            featureCollection={data.featureCollection}
            style={data.styler}
          />
        </TopicMapComponent>
      </TopicMapContextProvider>
    </Card>
  );
};
export default Map;

Map.propTypes = {
  /**
   * The width of the map
   */
  width: PropTypes.number,

  /**
   * The height of the map
   */
  height: PropTypes.number,

  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.object,
  /**
   * The extractor function that is used to transform the dataIn object into the data object
   */
  extractor: PropTypes.func,

  /**
   * The style of the map
   */
  mapStyle: PropTypes.object,
};
