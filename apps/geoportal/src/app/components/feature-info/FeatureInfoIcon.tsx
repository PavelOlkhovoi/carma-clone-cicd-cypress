import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FeatureInfoIcon = () => {
  return (
    <div
      className="relative inline-block"
      style={{
        width: "26px",
        height: "21px",
      }}
    >
      <FontAwesomeIcon
        icon={faSquare}
        size="2x"
        style={{
          color: "grey",
          width: "26px",
          strokeWidth: "4",
        }}
      />
      <FontAwesomeIcon
        icon={faInfo}
        className="absolute left-0 top-1.5"
        style={{
          color: "grey",
          width: "26px",
        }}
      />
    </div>
  );
};

export default FeatureInfoIcon;
