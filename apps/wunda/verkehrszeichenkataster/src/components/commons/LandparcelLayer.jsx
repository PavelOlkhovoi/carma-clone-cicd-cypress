import { useDispatch, useSelector } from "react-redux";
import { getBBPoly, setHoveredProperties } from "../../store/slices/mapping";
import { getJWT } from "../../store/slices/auth";
import { ENDPOINT, landParcelQuery } from "../../constants/vkz";

import GraphqlMapLayer from "./GraphqlMapLayer";
import { createFeatureArray } from "../../tools/mappingTools";

const LandparcelLayer = () => {
  const bbPoly = useSelector(getBBPoly);
  const jwt = useSelector(getJWT);
  const query = landParcelQuery;
  const dispatch = useDispatch();

  return (
    <>
      {bbPoly && (
        <GraphqlMapLayer
          query={query}
          jwt={jwt}
          variables={{ bbPoly: bbPoly }}
          endpoint={ENDPOINT}
          style={{
            color: "#00000040",
            fillColor: "#00000020",
            weight: 2,
          }}
          hoveredStyle={{
            color: "#00000040",
            fillColor: "#00000020",
            weight: 4,
          }}
          useHover={true}
          createFeature={createFeatureArray}
          onHover={(feature) =>
            dispatch(setHoveredProperties(feature.properties))
          }
          onOutsideHover={(feature) => {
            dispatch(setHoveredProperties({}));
          }}
        />
      )}
    </>
  );
};

export default LandparcelLayer;
