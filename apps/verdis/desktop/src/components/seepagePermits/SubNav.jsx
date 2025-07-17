import { setShowSeepageDetails } from "../../store/slices/settings";
import DetailSwitcher from "../commons/DetailSwitcher";

const SubNav = () => {
  return (
    <DetailSwitcher
      title="Versickerungsgenehmigungen"
      buttonName="Details"
      baseRoute="/versickerungsgenehmigungen"
      setShowDetails={setShowSeepageDetails}
    />
  );
};

export default SubNav;
