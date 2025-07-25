import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  Color,
  HeadingPitchRange,
  Math as CesiumMath,
  PerspectiveFrustum,
  Rectangle,
  OrthographicFrustum,
} from "cesium";
import { Viewer as ResiumViewer } from "resium";

import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";

import { useTweakpaneCtx } from "@carma-commons/debug";

import {
  selectShowSecondaryTileset,
  selectViewerIsMode2d,
} from "./slices/cesium";

import ControlsUI from "./components/ControlsUI";
import Crosshair from "./components/Crosshair";
import MiniMap from "./components/LeafletMiniMap";
import { ResizeableContainer } from "./components/ResizeableContainer";
import { TopicMap } from "./components/TopicMap";

import { useCesiumContext } from "./hooks/useCesiumContext";
import { useCesiumViewer } from "./hooks/useCesiumViewer";
import useDisableSSCC from "./hooks/useDisableSSCC";
import { useInitializeViewer } from "./hooks/useInitializeViewer";
import { useSceneStyles } from "./hooks/useSceneStyles";
import { useTilesets } from "./hooks/useTilesets";

import { resolutionFractions } from "./utils/cesiumHelpers";

import { formatFractions } from "./utils/formatters";
import { setLeafletView } from "./utils/leafletHelpers";

type CustomViewerProps = {
  children?: ReactNode;
  className?: string;
  postInit?: () => void;

  // Init
  homeOrientation?: HeadingPitchRange;
  // UI
  showControls?: boolean;
  showFader?: boolean;
  showHome?: boolean;
  showLockCenter?: boolean;
  showOrbit?: boolean;
  showCrosshair?: boolean;

  // override resium UI defaults
  infoBox?: boolean;
  selectionIndicator?: boolean;

  //disableZoomRestrictions?: boolean; // todo
  //minZoom?: number; // todo
  globe?: {
    // https://cesium.com/learn/cesiumjs/ref-doc/Globe.html
    baseColor?: Color;
    cartographicLimitRectangle?: Rectangle;
    showGroundAtmosphere?: boolean;
    showSkirts?: boolean;
  };

  minimapLayerUrl?: string;
  onSceneChange?: (e: unknown) => void;
};

export function CustomViewerPlayground(props: CustomViewerProps) {
  const { viewerRef, viewerAnimationMapRef } = useCesiumContext();
  let viewer = useCesiumViewer();

  const isSecondaryStyle = useSelector(selectShowSecondaryTileset);
  const isMode2d = useSelector(selectViewerIsMode2d);
  //const isAnimating = useViewerIsAnimating();

  const {
    children,
    className,
    showControls = true,
    showHome = true,
    showOrbit = true,
    selectionIndicator = false,
    globe: globeProps = {
      baseColor: Color.WHITESMOKE,
      cartographicLimitRectangle: undefined,
      showGroundAtmosphere: false,
      showSkirts: false,
    },
    minimapLayerUrl,
  } = props;

  const [showFader, setShowFader] = useState(props.showFader ?? false);
  const [showMiniMap, setShowMiniMap] = useState<boolean>(false);
  const [viewportLimit, setViewportLimit] = useState<number>(4);
  const [viewportLimitDebug, setViewportLimitDebug] = useState<boolean>(false);

  const [showCrosshair, setShowCrosshair] = useState<boolean>(
    props.showCrosshair ?? true
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topicMapContext: any =
    useContext<typeof TopicMapContext>(TopicMapContext);

  const [isUserAction, setIsUserAction] = useState(false);
  // DEV TWEAKPANE

  // Create a callback function to set the FOV

  useTweakpaneCtx(
    useMemo(
      () => ({
        folder: {
          title: "Camera Settings",
        },
        params: {
          get fov() {
            return (
              (viewer?.scene.camera.frustum as PerspectiveFrustum)?.fov || 1.0
            );
          },

          set fov(value: number) {
            if (
              viewer &&
              viewer.scene.camera.frustum instanceof PerspectiveFrustum &&
              !Number.isNaN(value)
            ) {
              viewer.scene.camera.frustum.fov = value;
            }
          },
          get orthographic() {
            return viewer?.scene.camera.frustum instanceof OrthographicFrustum;
          },
          set orthographic(value: boolean) {
            if (viewer) {
              if (
                value &&
                viewer.scene.camera.frustum instanceof PerspectiveFrustum
              ) {
                viewer.scene.camera.switchToOrthographicFrustum();
              } else if (
                viewer.scene.camera.frustum instanceof OrthographicFrustum
              ) {
                viewer.scene.camera.switchToPerspectiveFrustum();
              }
            }
          },
        },
        inputs: [
          {
            name: "fov",
            label: "FOV",
            min: Math.PI / 400,
            max: Math.PI,
            step: 0.01,
            format: (v) => `${parseFloat(CesiumMath.toDegrees(v).toFixed(2))}°`,
          },
          {
            name: "orthographic",
            label: "Orthographic",
            type: "boolean",
          },
        ],
      }),
      []
    )
  );

  useTweakpaneCtx(
    useMemo(
      () => ({
        folder: {
          title: "Scene Settings",
        },
        params: {
          get showMiniMap() {
            return showMiniMap;
          },
          set showMiniMap(value: boolean) {
            setShowMiniMap(value);
          },
          get viewportLimitDebug() {
            return viewportLimitDebug;
          },
          set viewportLimitDebug(value: boolean) {
            setViewportLimitDebug(value);
          },
          get viewportLimit() {
            return viewportLimit;
          },
          set viewportLimit(value: number) {
            !Number.isNaN(value) && setViewportLimit(value);
          },
          get showCrosshair() {
            return showCrosshair;
          },
          set showCrosshair(value: boolean) {
            setShowCrosshair(value);
          },
          get showFader() {
            return showFader;
          },
          set showFader(value: boolean) {
            setShowFader(value);
          },
          get resolutionScale() {
            // Find the closest value in the array to the current resolutionScale and return its index
            const currentValue = viewer ? viewer.resolutionScale : 1;
            const closestIndex = resolutionFractions.findIndex(
              (value) => value === currentValue
            );
            return closestIndex !== -1
              ? closestIndex
              : resolutionFractions.length - 1; // Default to the last index if not found
          },
          set resolutionScale(index) {
            // Use the index to set the resolutionScale from the array
            if (viewer && index >= 0 && index < resolutionFractions.length) {
              const value = resolutionFractions[index];
              viewer.resolutionScale = value;
            }
          },
        },
        inputs: [
          { name: "showFader" },
          { name: "showCrosshair" },
          { name: "showMiniMap" },
          { name: "viewportLimit", min: 1.5, max: 10, step: 0.5 },
          { name: "viewportLimitDebug" },
          {
            name: "resolutionScale",
            min: 0, // The minimum index
            max: resolutionFractions.length - 1, // The maximum index
            step: 1, // Step by index
            format: (v: number) => formatFractions(resolutionFractions[v]),
          },
        ],
      }),
      []
    )
  );
  useEffect(() => {
    if (!viewerRef.current) return;
    const viewer = viewerRef.current;

    const canvas = viewer.canvas;

    viewer.scene.requestRenderMode = true;

    // Ensure the canvas can receive focus
    canvas.setAttribute("tabindex", "0");

    // Event handlers
    const handleFocus = () => setIsUserAction(true);
    const handleBlur = () => setIsUserAction(false);
    const handleMouseDown = () => {
      canvas.focus();
      setIsUserAction(true);
    };

    // Add event listeners
    canvas.addEventListener("focus", handleFocus);
    canvas.addEventListener("blur", handleBlur);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseDown); // Track mouse move as interaction

    // Cleanup event listeners on unmount
    return () => {
      canvas.removeEventListener("focus", handleFocus);
      canvas.removeEventListener("blur", handleBlur);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseDown);
    };
  }, [viewerRef]);

  const location = useLocation();

  useInitializeViewer();

  useEffect(() => {
    if (!viewerRef.current) return;
    const viewer = viewerRef.current;
    if (viewer) {
      console.debug(
        "HOOK: update Hash, route or style changed",
        isSecondaryStyle
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerRef, location.pathname, isSecondaryStyle]);

  useEffect(() => {
    if (!viewerRef.current) return;
    const viewer = viewerRef.current;
    if (viewer) {
      console.debug("HOOK: globe setting changed");
      // set the globe props
      //Object.assign(scene.globe, globeProps);
      Object.entries(globeProps).forEach(([key, value]) => {
        if (viewer && value !== undefined) {
          viewer.scene.globe[key] = value;
        }
      });
    }
  }, [viewerRef, globeProps]);

  useDisableSSCC();

  useSceneStyles();

  useTilesets();

  useEffect(() => {
    console.debug("HOOK: viewer changed", isSecondaryStyle);
    if (!viewerRef.current) return;
    const viewer = viewerRef.current;

    const moveEndListener = async () => {
      if (viewer?.camera.position) {
        console.debug("LISTENER: moveEndListener", isSecondaryStyle);

        if (isUserAction && (!isMode2d || showFader)) {
          // remove roll from camera orientation
          const rollDeviation =
            Math.abs(CesiumMath.TWO_PI - viewer.camera.roll) %
            CesiumMath.TWO_PI;
          if (rollDeviation > 0.02) {
            console.debug("LISTENER HOOK: flyTo reset roll", rollDeviation);
            const duration = Math.min(rollDeviation, 1);
            viewer.camera.flyTo({
              destination: viewer.camera.position,
              orientation: {
                heading: viewer.camera.heading,
                pitch: viewer.camera.pitch,
                roll: 0,
              },
              duration,
            });
          }
          // preload 2D view
          const leaflet =
            topicMapContext?.routedMapRef?.leafletMap?.leafletElement;
          console.debug("leaflet", leaflet, topicMapContext?.routedMapRef);
          leaflet && setLeafletView(viewer, leaflet, { animate: false });
        }
      }
    };

    viewer.camera.moveEnd.addEventListener(moveEndListener);
    return () => {
      viewer?.camera.moveEnd.removeEventListener(moveEndListener);
    };
  }, [
    viewerRef,
    location.pathname,
    isSecondaryStyle,
    showFader,
    topicMapContext?.routedMapRef,
    isMode2d,
    isUserAction,
  ]);

  console.debug("RENDER: CustomViewer");

  return (
    <ResiumViewer
      ref={(node) => {
        if (node !== null) {
          viewerRef.current = node.cesiumElement ?? null;
        }
      }}
      className={className}
      // Resium ViewerOtherProps
      full // equals style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}`
      // Cesium Props
      // see https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions for defaults

      // quality and performance
      msaaSamples={2}
      useBrowserRecommendedResolution={false} // crisper image, does not ignore devicepixel ratio
      // resolutionScale={window.devicePixelRatio} // would override dpr
      scene3DOnly={true} // No 2D map resources loaded
      // sceneMode={SceneMode.SCENE3D} // Default but explicit

      // hide UI
      baseLayer={false}
      animation={false}
      baseLayerPicker={false}
      fullscreenButton={false}
      geocoder={false}
      homeButton={false}
      infoBox={false}
      sceneModePicker={false}
      selectionIndicator={selectionIndicator}
      timeline={false}
      navigationHelpButton={false}
      navigationInstructionsInitiallyVisible={false}
      skyBox={false}
    >
      {children}
      {showControls && (
        <ControlsUI
          viewerRef={viewerRef}
          viewerAnimationMapRef={viewerAnimationMapRef}
          isViewerReady={true} // TODO: check if ready properly
          showHome={showHome}
          showOrbit={showOrbit}
        />
      )}
      {showCrosshair && <Crosshair lineColor="white" />}
      <ResizeableContainer enableDragging={showFader} start={showFader ? 5 : 0}>
        <TopicMap forceShow={showFader} />
      </ResizeableContainer>
      {showMiniMap && minimapLayerUrl && (
        <MiniMap
          layerUrl={minimapLayerUrl}
          viewportLimitResolutionFactor={viewportLimit}
          showCesiumPolygon={viewportLimitDebug}
        />
      )}
    </ResiumViewer>
  );
}

export default CustomViewerPlayground;
