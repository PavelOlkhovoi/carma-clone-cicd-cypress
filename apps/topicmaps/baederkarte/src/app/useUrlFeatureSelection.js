import { useContext, useEffect, useRef } from "react";
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from "react-cismap/contexts/FeatureCollectionContextProvider";
import { TopicMapDispatchContext } from "react-cismap/contexts/TopicMapContextProvider";
export const useUrlFeatureSelection = (
  predicateArgument = (feature, objectId) =>
    String(feature.properties.id) === String(objectId)
) => {
  const { initializingFeatures, shownFeatures } = useContext(
    FeatureCollectionContext
  );
  const { setSelectedFeatureByPredicate } = useContext(
    FeatureCollectionDispatchContext
  );
  const { zoomToFeature } = useContext(TopicMapDispatchContext);
  const hasProcessedUrl = useRef(false);
  useEffect(() => {
    console.log("xxx hasProcessedUrl 1", hasProcessedUrl.current);
    if (
      !initializingFeatures &&
      shownFeatures &&
      shownFeatures.length > 0 &&
      !hasProcessedUrl.current
    ) {
      console.log("xxx hasProcessedUrl 2");
      if (window.location.hash) {
        // parse without the leading '#'
        const myParams = new URLSearchParams(window.location.hash.slice(1));
        const objectId = myParams.get("tmSelectionObject");
        console.log("xxx found objectId", objectId);
        // do whatever selection logic you need here, then remove the param
        myParams.delete("tmSelectionObject");
        // build a new hash string (empty string if no params remain)
        const rebuilt = myParams.toString(); // '' or 'a=1&b=2'
        const newHash = rebuilt ? `#${rebuilt}` : "";
        // construct a new URL without changing path/search
        const newUrl =
          window.location.pathname + window.location.search + newHash;
        // mark processed and replace the URL (no page reload)
        hasProcessedUrl.current = true;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, [initializingFeatures, shownFeatures]);
  return null;
};
