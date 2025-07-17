import Icon from "react-cismap/commons/Icon";
import { getColorForProperties } from "./styler";
import { constants as kitasConstants } from "./constants";
import { useSelector } from "react-redux";
import { getFeatureRenderingOption } from "../store/slices/ui";

const KitasTraegertypMapVisSymbol = ({ traegertyp, visible = true }) => {
  const renderingOption = useSelector(getFeatureRenderingOption);

  if (visible) {
    return (
      <Icon
        style={{
          color: getColorForProperties({ traegertyp }, renderingOption),
          width: "30px",
          textAlign: "center",
        }}
        name={"circle"}
      />
    );
  } else {
    return null;
  }
};

export default KitasTraegertypMapVisSymbol;
