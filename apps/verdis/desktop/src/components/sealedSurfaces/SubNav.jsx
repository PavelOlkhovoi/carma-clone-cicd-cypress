import { setShowSurfaceDetails } from "../../store/slices/settings";
import DetailSwitcher from "../commons/DetailSwitcher";

const SubNav = () => {
  return (
    <DetailSwitcher
      title="Versiegelte Flächen"
      buttonName="Flächen"
      baseRoute="/versiegelteFlaechen"
      setShowDetails={setShowSurfaceDetails}
    />
  );
};

export default SubNav;
