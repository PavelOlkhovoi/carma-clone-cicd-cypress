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
      let objectId = null;
      console.log("xxx hasProcessedUrl 2");

      if (window.location.hash) {
        const currentUrl = new URL(window.location.href);
        const rawHash = currentUrl.hash.startsWith("#")
          ? currentUrl.hash.slice(1)
          : currentUrl.hash;

        const [hashPath, hashQuery = ""] = rawHash.split("?"); // keep route before ?
        const params = new URLSearchParams(hashQuery);
        console.log("xxx hasProcessedUrl 3");
        const objectId = params.get("tmSelectionObject");
        console.log("xxx objectId", objectId);

        setTimeout(() => {
          params.delete("tmSelectionObject");
          const rebuilt = params.toString();
          currentUrl.hash = rebuilt ? `${hashPath}?${rebuilt}` : hashPath;

          hasProcessedUrl.current = true;

          window.history.replaceState({}, "", currentUrl.toString());
          console.log("xxx hasProcessedUrl 4");
        }, 2000);
      }

      //   if (objectId) {
      //     const targetFeature = shownFeatures.find((feature) =>
      //       predicateArgument(feature, objectId)
      //     );

      //     const currentUrl = new URL(window.location.href);

      //     if (currentUrl.hash) {
      //       let hashString = currentUrl.hash.substring(1);

      //       if (hashString.includes("?")) {
      //         const [hashPath, hashQuery] = hashString.split("?");
      //         const hashParams = new URLSearchParams(hashQuery);
      //         hashParams.delete("tmSelectionObject");

      //         const remainingParams = hashParams.toString();
      //         currentUrl.hash = remainingParams
      //           ? `${hashPath}?${remainingParams}`
      //           : hashPath;
      //       } else {
      //         const hashParams = new URLSearchParams(hashString);
      //         hashParams.delete("tmSelectionObject");
      //         currentUrl.hash = hashParams.toString();
      //       }
      //     }

      //     window.history.replaceState({}, "", currentUrl.toString());
      //     hasProcessedUrl.current = true;

      //     if (targetFeature) {
      //       setSelectedFeatureByPredicate(predicateArgument);
      //       zoomToFeature(targetFeature);
      //     }
      //   }
    }
  }, [initializingFeatures, shownFeatures]);

  return null;
};
