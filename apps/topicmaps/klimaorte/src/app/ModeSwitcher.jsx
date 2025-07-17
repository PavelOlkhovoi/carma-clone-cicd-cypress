import React from "react";

import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ResponsiveTopicMapContext } from "react-cismap/contexts/ResponsiveTopicMapContextProvider";
import { appModes } from "./helper/modeParser";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";
import klimaortTitleFactory from "./helper/klimaortTitleFactory";

// disable chncor is valid rule

const Comp = ({ mode, setMode }) => {
  let titleContent;
  const { windowSize } = useContext(ResponsiveTopicMapContext);
  const featureCollectionContext = useContext(FeatureCollectionContext);

  if (mode === appModes.ORTE) {
    const mainTitle = klimaortTitleFactory({ featureCollectionContext });
    titleContent = (
      <div>
        {mainTitle}
        <div style={{ float: "right", paddingRight: 10 }}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className="renderAsLink"
            style={{ color: "#337ab7" }}
            onClick={() => {
              setMode(appModes.ROUTEN);
            }}
          >
            <FontAwesomeIcon icon={faRandom} style={{ marginRight: 5 }} />
            Klimarouten
          </a>
        </div>
      </div>
    );
  } else {
    titleContent = (
      <div>
        <b>Klimarouten in Wuppertal</b>
        <div style={{ float: "right", paddingRight: 10 }}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className="renderAsLink"
            style={{ color: "#337ab7" }}
            onClick={() => {
              setMode(appModes.ORTE);
            }}
          >
            <FontAwesomeIcon icon={faRandom} style={{ marginRight: 5 }} />
            Klimaorte
          </a>
        </div>
      </div>
    );
  }

  let title = null;
  title = (
    <table
      border="0"
      style={{
        width: (windowSize?.width || 300) - 54 - 12 - 38 - 12 + "px",
        height: "30px",
        position: "absolute",
        left: 54,
        top: 12,
        zIndex: 555,
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              textAlign: "center",
              verticalAlign: "middle",
              background: "#ffffff",
              color: "black",
              opacity: "0.9",
              _paddingLeft: "10px",
            }}
          >
            {titleContent}
          </td>
        </tr>
      </tbody>
    </table>
  );
  return title;
};

export default Comp;
