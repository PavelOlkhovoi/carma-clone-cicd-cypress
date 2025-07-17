export const mapExtractor = ({ landparcel, geometry, ondblclick }) => {
  if (geometry) {
    const feature = {
      type: "Feature",
      featureType: "landparcel",
      id: "landparcel." + landparcel?.id || "noIdBCtmpGeom",
      geometry: geometry,
      featuretype: landparcel ? "lagis" : "private",
      crs: geometry?.crs,
      properties: {
        id: landparcel?.id,
      },
    };

    return {
      homeCenter: [51.272570027476256, 7.19963690266013],
      homeZoom: 16,
      featureCollection: geometry ? [feature] : [],
      styler: (feature) => {
        const style = {
          color: "#005F6B",
          weight: 1,
          opacity: 0.6,
          fillColor: feature.featuretype === "lagis" ? "#26ADE4" : "#F2E2C2",
          fillOpacity: 0.6,
          className: "landparcel-" + feature.properties.id,
        };
        return style;
      },
      ondblclick,
    };
  } else {
    return {
      homeCenter: [51.272570027476256, 7.19963690266013],
      homeZoom: 13,
      featureCollection: [],
      ondblclick,
    };
  }
};
