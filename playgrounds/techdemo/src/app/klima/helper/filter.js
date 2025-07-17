const itemFilterFunction = ({ filterState, filterMode }) => {
  return (item) => {
    if (filterMode === "themen") {
      return filterState?.themen?.includes(item.thema.id);
    } else if (filterMode === "kategorien") {
      for (const cat of item.kategorien) {
        if (filterState?.kategorien?.includes(cat)) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  };
};
export default itemFilterFunction;
