import { setShowFrontDetails } from "../../store/slices/settings";
import DetailSwitcher from "../commons/DetailSwitcher";

const SubNav = () => {
  return (
    <DetailSwitcher
      title="Straßenreinigung"
      buttonName="Fronten"
      baseRoute="/strassenreinigung"
      setShowDetails={setShowFrontDetails}
    />
  );
};

export default SubNav;
