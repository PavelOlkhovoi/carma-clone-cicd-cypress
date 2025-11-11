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
        // Remove leading '#' and any leading '/' or '?'
        let hashContent = window.location.hash.slice(1);
        // Handle patterns like #/? or #? or #/
        hashContent = hashContent.replace(/^[\/\?]+/, '');
        
        const myParams = new URLSearchParams(hashContent);
        const objectId = myParams.get("tmSelectionObject");
        console.log("xxx found objectId", objectId);

        myParams.delete("tmSelectionObject");
        const rebuilt = myParams.toString();
        // Preserve the original hash prefix pattern (e.g., #/?)
        const hashPrefix = window.location.hash.match(/^#[\/\?]*/)?.[0] || '#';
        const newHash = rebuilt ? `${hashPrefix}${rebuilt}` : "";
        const newUrl =
          window.location.pathname + window.location.search + newHash;

        hasProcessedUrl.current = true;
        window.history.replaceState({}, "", newUrl);

        // INTERCEPT future pushState calls to remove tmSelectionObject
        const originalPushState = window.history.pushState;
        window.history.pushState = function (data, unused, url) {
          if (
            url &&
            typeof url === "string" &&
            url.includes("tmSelectionObject")
          ) {
            // Remove tmSelectionObject from the URL before pushing
            const hashIndex = url.indexOf("#");
            if (hashIndex !== -1) {
              const beforeHash = url.substring(0, hashIndex);
              let afterHash = url.substring(hashIndex + 1);
              
              // Extract and preserve hash prefix (e.g., /?)
              const prefixMatch = afterHash.match(/^[\/\?]*/);
              const hashPrefix = prefixMatch ? prefixMatch[0] : '';
              const hashParams = afterHash.replace(/^[\/\?]+/, '');
              
              const params = new URLSearchParams(hashParams);
              params.delete("tmSelectionObject");
              const newHash = params.toString();
              url = newHash ? `${beforeHash}#${hashPrefix}${newHash}` : beforeHash;
            }
          }
          return originalPushState.apply(this, [data, unused, url]);
        };
      }
    }
  }, [initializingFeatures, shownFeatures]);
  return null;
};
