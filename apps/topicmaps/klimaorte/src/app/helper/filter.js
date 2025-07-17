import { appModes } from "./modeParser";

const itemFilterFunction = ({
  filterState,
  filterMode,
  appMode,
  itemsDictionary,
}) => {
  const ortFilter = (item) => {
    if (filterMode === "themen") {
      return filterState?.themen?.includes(item?.thema?.id);
    } else if (filterMode === "kategorien") {
      for (const cat of item.kategorien || []) {
        if (filterState?.kategorien?.includes(cat)) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  };

  if (appMode === appModes.ROUTEN) {
    return (item) => {
      if (item.typ === "route") {
        return true;
      } else if (item.typ === "ort") {
        // return ortFilter(item) && itemsDictionary.allStandorteInRouten.includes(item.standort.id);
        // ort filter soll sich in routen modus nicht auf orten auswirken
        return itemsDictionary.allStandorteInRouten.includes(item.standort.id);
      } else if (item.typ === "zwischenstopp") {
        return itemsDictionary.allZwischenstoppsInRouten.includes(item.id);
      } else if (item.typ === "poi") {
        return itemsDictionary.allPoisInRouten.includes(item.id);
      }
    };
  } else {
    return (item) => {
      if (item.typ === "ort") {
        return ortFilter(item);
      } else {
        //Routen werden rausgefiltert
        return false;
      }
    };
  }
};
export default itemFilterFunction;
