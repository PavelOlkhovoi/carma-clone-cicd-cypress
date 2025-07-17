import { useSelector } from "react-redux";
import { getHoveredLandparcel } from "../../store/slices/ui";

const HoveredLandparcelInfo = () => {
  const hoveredLandparcel = useSelector(getHoveredLandparcel);

  return (
    <span style={{ width: "200px", color: "grey" }}>{hoveredLandparcel}</span>
  );
};

export default HoveredLandparcelInfo;
