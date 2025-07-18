import React, { useContext, useMemo } from "react";
import CustomizationContextProvider from "react-cismap/contexts/CustomizationContextProvider";
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from "react-cismap/contexts/FeatureCollectionContextProvider";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import ModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import Section from "react-cismap/topicmaps/menu/Section";
import { TopicMapDispatchContext } from "react-cismap/contexts/TopicMapContextProvider";
import { getSymbolSVG } from "./helper/helper";
import versionData from "../version.json";
import { getApplicationVersion } from "@carma-commons/utils";

const MenuTitle = () => <div></div>;
const MenuSubTitle = () => <div></div>;
const Footer = () => <div></div>;
const getFilterHeader = () => '';
const FilterStyle = {};

const Menu = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);
  const { filteredItems, shownFeatures, filterState, itemsDictionary } =
    useContext(FeatureCollectionContext);
  const { setFilterState } = useContext(FeatureCollectionDispatchContext);
  const { zoomToFeature } = useContext(TopicMapDispatchContext);

  const onlineSVG = getSymbolSVG(24, "#003B80", "pr", "onlineSVGinHELP");
  const offlineSVG = getSymbolSVG(24, "#888A87", "pr", "offlineSVGinHELP");

  // const getFilterHeader = () => {
  //   const count = filteredItems?.length || 0;

  //   let term;
  //   if (count === 1) {
  //     term = "Ladestation";
  //   } else {
  //     term = "Ladestationen";
  //   }

  //   return `Filter (${count} ${term} gefunden, davon ${
  //     shownFeatures?.length || "0"
  //   } in der Karte)`;
  // };

  const steckertypes = useMemo(
    () => itemsDictionary?.steckerverbindungen || [],
    [itemsDictionary]
  );

  return (
    <CustomizationContextProvider customizations={{}}>
      <ModalApplicationMenu
        menuIcon={"bars"}
        menuTitle={"Filter, Einstellungen und Kompaktanleitung"}
        menuFooter={
          <Footer
            version={getApplicationVersion(versionData)}
            setAppMenuActiveMenuSection={setAppMenuActiveMenuSection}
          />
        }

        menuSections={[


          // <KompaktanleitungSection
          //   onlineSVG={onlineSVG}
          //   offlineSVG={offlineSVG}
          // />,
          // <GenericDigitalTwinReferenceSection />,
        ]}
      />
    </CustomizationContextProvider>
  );
};
export default Menu;
const NW = (props) => {
  return <span style={{ whiteSpace: "nowrap" }}>{props.children}</span>;
};
