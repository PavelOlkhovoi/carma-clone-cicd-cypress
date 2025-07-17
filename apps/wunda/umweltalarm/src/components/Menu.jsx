import DefaultSettingsPanel from "react-cismap/topicmaps/menu/DefaultSettingsPanel";
import ModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import versionData from "../version.json";
import { getApplicationVersion } from "@carma-commons/utils";
import { getCollabedHelpComponentConfig } from "@carma-collab/wuppertal/umweltalarm";

const MyMenu = () => {
  const simpleHelp = undefined;
  const version = getApplicationVersion(versionData);
  return (
    <ModalApplicationMenu
      {...getCollabedHelpComponentConfig({
        versionString: version,
        previousSections: [
          <DefaultSettingsPanel
            key="settings"
            skipFilterTitleSettings={true}
            skipClusteringSettings={true}
            skipSymbolsizeSetting={true}
            previewMapPosition="lat=51.26237138174926&lng=7.236986160278321&zoom=16"
          />,
        ],
      })}
    />
  );
};
export default MyMenu;
