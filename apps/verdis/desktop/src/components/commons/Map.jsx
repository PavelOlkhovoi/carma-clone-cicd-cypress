import "react-cismap/topicMaps.css";
import "leaflet/dist/leaflet.css";
import { Card, Tooltip } from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FeatureCollectionDisplay,
  MappingConstants,
  RoutedMap,
  TransitiveReactLeaflet,
} from "react-cismap";
import { TopicMapStylingContext } from "react-cismap/contexts/TopicMapStylingContextProvider";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { getBoundsForFeatureArray } from "../../tools/mappingTools";
import Dot from "./Dot";
import { faImage as regularImage } from "@fortawesome/free-regular-svg-icons";
import Overlay from "./Overlay";
import LandParcelChooser from "./LandParcelChooser";

import {
  getIsLoading,
  storeFlaechenId,
  storeFrontenId,
} from "../../store/slices/search";
import {
  getLockMap,
  getShowBackground,
  getShowCurrentFeatureCollection,
  setFlaechenSelected,
  setFrontenSelected,
  setGeneralGeometrySelected,
  getLockMapOnlyInKassenzeichen,
  setLockMapOnlyInKassenzeichen,
  setShowBackground,
  setShowCurrentFeatureCollection,
  setGraphqlStatus,
  setLockMap,
  getFitBoundsCounter,
} from "../../store/slices/mapping";
import {
  faExpandArrowsAlt,
  faF,
  faLock,
  faLockOpen,
  faPlane,
  faImage as solidImage,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import BackgroundLayers from "./BackgroundLayers";
import AdditionalLayers from "./AdditionalLayers";
import {
  getActiveAdditionalLayers,
  getActiveBackgroundLayer,
  getAdditionalLayerOpacities,
  getBackgroundLayerOpacities,
  isMapLoading,
  setHoveredObject,
} from "../../store/slices/ui";
import proj4 from "proj4";
import { proj4crs3857def } from "react-cismap/constants/gis";
import { getJWT } from "../../store/slices/auth";
import Toolbar from "./Toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RectangleSearch from "../searchShapes/RectangleSearch";
import ShapeSearchButton from "../ui/ShapeSearchButton";
import { PointSearchButton, PointSearch } from "@carma-apps/alkis-renderer";
import { getShapeMode, storeShapeMode } from "../../store/slices/searchMode";
import {
  TopicMapSelectionContent,
  useGazData,
  useSelection,
} from "@carma-apps/portals";
import { LibFuzzySearch } from "@carma-mapping/fuzzy-search";
import { isAreaType } from "@carma-commons/resources";
import { Control, ControlLayout } from "@carma-mapping/map-controls-layout";
import { ZoomControl } from "@carma-mapping/components";
import { TopicMapDispatchContext } from "react-cismap/contexts/TopicMapContextProvider";

const { ScaleControl } = TransitiveReactLeaflet;

const mockExtractor = (input) => {
  return {
    homeCenter: [51.27225612927373, 7.199918031692506],
    homeZoom: 16,
    featureCollection: [],
  };
};

const Map = ({
  shownIn,
  dataIn,
  extractor = mockExtractor,
  width = 400,
  height = 500,
  children,
  boundingBoxChangedHandler = () => {},
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [urlParams, setUrlParams] = useSearchParams();
  // const [fallback, setFallback] = useState({});
  const [showVirtualCityOverlay, setShowVirtualCityOverlay] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [showFIcon, setShowFIcon] = useState(true);
  const showCurrentFeatureCollection = useSelector(
    getShowCurrentFeatureCollection
  );
  const fitBoundsCounter = useSelector(getFitBoundsCounter);

  const isLoading = useSelector(getIsLoading);
  const showBackground = useSelector(getShowBackground);
  const jwt = useSelector(getJWT);
  const mode = useSelector(getShapeMode);
  const [overlayFeature, setOverlayFeature] = useState(null);

  const data = extractor(dataIn);
  const padding = 5;
  const headHeight = 37;
  const toolBarHeight = 34;

  const cardRef = useRef(null);
  const [mapWidth, setMapWidth] = useState(0);
  const [showLandParcelChooser, setShowLandParcelChooser] = useState(false);
  const [initialFitBoundsCounter, setInitialFitBoundsCounter] =
    useState(fitBoundsCounter);
  const [mapHeight, setMapHeight] = useState(window.innerHeight * 0.5); //uggly winning
  const {
    backgroundModes,
    selectedBackground,
    baseLayerConf,
    backgroundConfigurations,
    activeAdditionalLayerKeys,
  } = useContext(TopicMapStylingContext);

  // const {
  //   setSelectedBackground,
  //   setNamedMapStyle,
  //   setActiveAdditionalLayerKeys,
  // } = useContext(TopicMapStylingDispatchContext);
  const isMapLoadingValue = useSelector(isMapLoading);
  let backgroundsFromMode;
  const browserlocation = useLocation();
  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
  }
  const { setRoutedMapRef } = useContext(TopicMapDispatchContext);

  const urlSearchParams = new URLSearchParams(browserlocation.search);
  const urlSearchParamsObject = paramsToObject(urlParams);

  const mapFallbacks = {
    position: {
      lat: urlSearchParamsObject?.lat ?? 51.272570027476256,
      lng: urlSearchParamsObject?.lng ?? 7.19963690266013,
    },
    zoom: urlSearchParamsObject?.zoom ?? 16,
  };
  try {
    backgroundsFromMode = backgroundConfigurations[selectedBackground].layerkey;
  } catch (e) {}

  const _backgroundLayers = backgroundsFromMode || "rvrGrau@40";
  const opacities = useSelector(getAdditionalLayerOpacities);
  const handleSetShowBackground = () => {
    dispatch(setShowBackground(!showBackground));
  };
  const handleShowCurrentFeatureCollection = () => {
    dispatch(setShowCurrentFeatureCollection(!showCurrentFeatureCollection));
  };
  const handleSetDonutSearch = (mode = "point") => {
    dispatch(storeShapeMode(mode));
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMapWidth(cardRef?.current?.offsetWidth);
        setMapHeight(cardRef?.current?.offsetHeight);
      }
    });

    resizeObserver.observe(cardRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // const params = paramsToObject(urlParams);
    // if (params.lat && params.lng && params.zoom) {
    //   console.log("xxx won't change map view");
    // } else {
    //   console.log("xxx data changed", data?.featureCollection);
    //   if (data?.featureCollection && refRoutedMap?.current) {
    //     fitFeatureArray(data?.featureCollection, refRoutedMap);
    //   }
    // }
  }, [data?.featureCollection, urlParams]);
  let refRoutedMap = useRef(null);
  const statusBarHeight = 34;
  const mapStyle = {
    width: mapWidth - 2 * padding,
    height: mapHeight - 2 * padding - headHeight - statusBarHeight,
    cursor: isMapLoadingValue ? "wait" : "pointer",
    clear: "both",
  };

  const defaults = {
    maxWidth: 200,
    metric: true,
    imperial: false,
    updateWhenIdle: false,
    position: "topright",
  };

  useEffect(() => {
    if (refRoutedMap?.current) {
      const map = refRoutedMap.current.leafletMap.leafletElement;
      map.invalidateSize();
    }
  }, [mapWidth, mapHeight]);
  [];
  const handleShowFIcon = () => {
    setShowFIcon(true);
  };
  const lockMap = useSelector(getLockMap);
  const lockMapOnlyInKassenzeichen = useSelector(getLockMapOnlyInKassenzeichen);

  function fitMapBounds() {
    const map = refRoutedMap?.current?.leafletMap?.leafletElement;
    if (map == undefined) {
      return;
    } else {
    }
    let bb = undefined;
    if (data?.featureCollection && data?.featureCollection.length > 0) {
      bb = getBoundsForFeatureArray(data?.featureCollection);
    } else if (data?.allFeatures && data?.allFeatures.length > 0) {
      bb = getBoundsForFeatureArray(data?.allFeatures);
    }

    if (map && bb) {
      map.fitBounds(bb);
    }
  }

  useEffect(() => {
    if (fitBoundsCounter > initialFitBoundsCounter) {
      setTimeout(() => {
        fitMapBounds();
      }, 250);
    }
    // if (isLoading === true) {
    //   return;
    // }
    // if (lockMap) {
    //   return;
    // }
  }, [fitBoundsCounter]);

  const backgroundLayerOpacities = useSelector(getBackgroundLayerOpacities);
  const additionalLayerOpacities = useSelector(getAdditionalLayerOpacities);
  const activeBackgroundLayer = useSelector(getActiveBackgroundLayer);
  const activeAdditionalLayers = useSelector(getActiveAdditionalLayers);

  const { gazData } = useGazData();
  const { setSelection } = useSelection();

  const onGazetteerSelection = (selection) => {
    if (!selection) {
      setSelection(null);
      return;
    }
    const selectionMetaData = {
      selectedFrom: "gazetteer",
      selectionTimestamp: Date.now(),
      isAreaSelection: isAreaType(selection.type),
    };
    setSelection(Object.assign({}, selection, selectionMetaData));

    setTimeout(() => {
      const pos = proj4(proj4crs3857def, proj4.defs("EPSG:4326"), [
        selection.x,
        selection.y,
      ]);
      const map = refRoutedMap.current.leafletMap.leafletElement;
      map.panTo([pos[1], pos[0]], {
        animate: false,
      });

      let hitObject = { ...selection };

      //Change the Zoomlevel of the map
      if (hitObject.more.zl) {
        map.setZoom(hitObject.more.zl, {
          animate: false,
        });
      }

      setShowFIcon(false);
    }, 0);
  };

  useEffect(() => {
    if (refRoutedMap.current !== null) {
      setRoutedMapRef(refRoutedMap.current);
    }
  }, [refRoutedMap]);

  return (
    <Card
      size="small"
      hoverable={false}
      title={<span>Karte</span>}
      extra={
        <div className="flex items-center gap-4">
          {/* {(isLoadingGeofields || isLoadingKassenzeichenWithPoint) && (
            <LoadingOutlined />
          )} */}
          <PointSearchButton
            setMode={handleSetDonutSearch}
            iconStyle="h-6 cursor-pointer"
          />
          <ShapeSearchButton />
          <Tooltip title="optimaler Kartenausschnitt für dieses Kassenzeichen">
            <div
              className="relative flex cursor-pointer items-center justify-center"
              onClick={() => fitMapBounds()}
            >
              <FontAwesomeIcon icon={faExpandArrowsAlt} className={`h-6`} />
            </div>
          </Tooltip>
          <Tooltip title="Kartenausschnitt für dieses Kassenzeichen beibehalten">
            <div
              className="relative flex cursor-pointer items-center justify-center"
              onClick={() =>
                dispatch(
                  setLockMapOnlyInKassenzeichen(!lockMapOnlyInKassenzeichen)
                )
              }
            >
              <FontAwesomeIcon
                icon={lockMapOnlyInKassenzeichen ? faLock : faLockOpen}
                className={`h-6 ${lockMapOnlyInKassenzeichen && "pr-[5.5px]"}`}
              />
              <span className="absolute -bottom-[10px] right-0 text-primary font-bold text-lg">
                K
              </span>
            </div>
          </Tooltip>
          <Tooltip title="Kartenausschnitt beibehalten">
            <FontAwesomeIcon
              icon={lockMap ? faLock : faLockOpen}
              onClick={() => dispatch(setLockMap(!lockMap))}
              className={`h-6 cursor-pointer ${lockMap && "pr-[5.5px]"}`}
            />
          </Tooltip>
          <Tooltip title="Schrägluftbild Overlay an/aus">
            <div
              className="relative flex items-center"
              onClick={() => setShowVirtualCityOverlay(!showVirtualCityOverlay)}
              role="button"
            >
              <FontAwesomeIcon icon={faPlane} className="h-6 cursor-pointer" />
              <Dot showDot={showVirtualCityOverlay} />
            </div>
          </Tooltip>
          <Tooltip title="Hintergrund an/aus">
            <div
              className="relative flex items-center"
              onClick={() => dispatch(setShowBackground(!showBackground))}
              role="button"
            >
              <FontAwesomeIcon
                icon={solidImage}
                className="h-6 cursor-pointer"
              />
              <Dot showDot={showBackground} />
            </div>
          </Tooltip>
          <Tooltip title="Vordergrund an/aus">
            <div
              className="relative flex items-center"
              onClick={() =>
                dispatch(
                  setShowCurrentFeatureCollection(!showCurrentFeatureCollection)
                )
              }
              role="button"
            >
              <FontAwesomeIcon
                icon={regularImage}
                className="h-6 cursor-pointer"
              />
              <Dot showDot={showCurrentFeatureCollection} />
            </div>
          </Tooltip>
        </div>
      }
      style={{
        width: "100%",
        height: "100%",
      }}
      bodyStyle={{ padding }}
      headStyle={{ backgroundColor: "white" }}
      type="inner"
      className="overflow-hidden shadow-md"
      ref={cardRef}
    >
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: 0,
          bottom: "0px",
          zIndex: 600,
        }}
      >
        <ControlLayout ifStorybook={false}>
          <Control position="topleft" order={10}>
            <ZoomControl />
          </Control>
        </ControlLayout>
      </div>
      <RoutedMap
        editable={false}
        style={mapStyle}
        key={"leafletRoutedMap"}
        zoomControlEnabled={false}
        // backgroundlayers={showBackground ? _backgroundLayers : null}
        backgroundlayers={null}
        urlSearchParams={urlSearchParams}
        layers=""
        referenceSystem={MappingConstants.crs3857}
        referenceSystemDefinition={MappingConstants.proj4crs3857def}
        ref={refRoutedMap}
        minZoom={9}
        maxZoom={25}
        zoomSnap={0.5}
        zoomDelta={0.5}
        fallbackPosition={mapFallbacks.position}
        fallbackZoom={urlSearchParamsObject?.zoom ?? mapFallbacks.zoom ?? 17}
        locationChangedHandler={(location) => {
          const newParams = { ...paramsToObject(urlParams), ...location };
          setUrlParams(newParams);
        }}
        boundingBoxChangedHandler={(boundingBox) => {
          boundingBoxChangedHandler(boundingBox);
          // try {
          //   const bbPoly = createQueryGeomFromBB(boundingBox);
          //   const area = getArea25832(bbPoly);
          //   const maxAreaForSearch = 130000;
          //   if (area < maxAreaForSearch && area !== 0) {
          //     setInfoText("");
          //     dispatch(searchForGeoFields(bbPoly));
          //   } else {
          //     setInfoText(
          //       "Zur Anzeige aller Flächen und Fronten, bitte eine größere Zoomstufe wählen"
          //     );
          //     dispatch(setToolbarProperties({}));
          //     dispatch(setFeatureCollection(undefined));
          //   }
          // } catch (e) {
          //   console.log("error in boundingBoxChangedHandler", e);
          // }
        }}
        ondblclick={(event) => {
          //if data contains a ondblclick handler, call it
          //Temporarily dsiable double click search
          // if (data.ondblclick) {
          //   data.ondblclick(event);
          // }
        }}
        // ondblclick={(event) => {
        //   //if data contains a ondblclick handler, call it
        //   if (data.ondblclick) {
        //     data.ondblclick(event);
        //   } else {
        //     const xy = convertLatLngToXY(event.latlng);
        //     dispatch(
        //       searchForKassenzeichenWithPoint(
        //         xy[0],
        //         xy[1],
        //         urlParams,
        //         setUrlParams
        //       )
        //     );
        //   }
        // }}
      >
        <TopicMapSelectionContent />
        <ScaleControl {...defaults} position="topright" />
        {/* {overlayFeature && (
          <ProjSingleGeoJson
            key={JSON.stringify(overlayFeature)}
            geoJson={overlayFeature}
            masked={true}
            maskingPolygon={maskingPolygon}
            mapRef={leafletRoutedMapRef}
          />
        )} */}
        {showLandParcelChooser && (
          <LandParcelChooser
            setGazetteerHit={onGazetteerSelection}
            setOverlayFeature={setOverlayFeature}
            setShowLandParcelChooser={setShowLandParcelChooser}
            setShowFIcon={setShowFIcon}
          />
        )}

        {showBackground && (
          <>
            <BackgroundLayers
              activeBackgroundLayer={activeBackgroundLayer}
              opacities={backgroundLayerOpacities}
            />
            <AdditionalLayers
              shownIn={shownIn}
              jwt={jwt}
              mapRef={refRoutedMap}
              activeLayers={activeAdditionalLayers}
              opacities={additionalLayerOpacities}
              onHoverUpdate={(featureproperties) => {
                dispatch(setHoveredObject(featureproperties));
              }}
              onGraphqlLayerStatus={(status) => {
                dispatch(setGraphqlStatus(status));
              }}
              openKassenzeichen={(kassenzeichen) => {
                console.log("open kassenzeichen", kassenzeichen);
              }}
            />
          </>
        )}
        {showVirtualCityOverlay && (
          <Overlay
            mapWidth={mapWidth}
            mapHeight={mapHeight}
            mapRef={refRoutedMap}
          />
        )}
        {data.featureCollection &&
          data.featureCollection.length > 0 &&
          showCurrentFeatureCollection && (
            <FeatureCollectionDisplay
              featureCollection={data.featureCollection}
              style={data.styler}
              markerStyle={data.markerStyle}
              showMarkerCollection={data.showMarkerCollection || false}
              featureClickHandler={
                data.featureClickHandler ||
                ((e) => {
                  const feature = e.target.feature;
                  if (feature.selected) {
                    const map = refRoutedMap.current.leafletMap.leafletElement;
                    const bb = getBoundsForFeatureArray([feature]);
                    // const { center, zoom } = getCenterAndZoomForBounds(map, bb);
                    // setUrlParams((prev) => {
                    //   prev.set("zoom", zoom);
                    //   prev.set("lat", center.lat);
                    //   prev.set("lng", center.lng);
                    //   return prev;
                    // });
                    if (map && bb) {
                      map.fitBounds(bb);
                    }
                  } else {
                    switch (feature.featureType) {
                      case "flaeche": {
                        dispatch(storeFlaechenId(feature.id));
                        dispatch(setFlaechenSelected({ id: feature.id }));

                        break;
                      }
                      case "front": {
                        dispatch(storeFrontenId(feature.properties.id));
                        dispatch(
                          setFrontenSelected({ id: feature.properties.id })
                        );
                        break;
                      }
                      case "general": {
                        dispatch(
                          setGeneralGeometrySelected({
                            id: feature.properties.id,
                          })
                        );
                        break;
                      }
                      default: {
                        console.log(
                          "no featureClickHandler set",
                          e.target.feature
                        );
                      }
                    }
                  }
                })
              }
            />
          )}
        <RectangleSearch
          map={refRoutedMap?.current?.leafletMap?.leafletElement}
        />
        <PointSearch
          map={refRoutedMap?.current?.leafletMap?.leafletElement}
          setMode={handleSetDonutSearch}
          jwt={jwt}
          mode={mode}
        />
      </RoutedMap>
      {!showLandParcelChooser && (
        <div className="custom-left-control">
          {showFIcon && (
            <Tooltip
              title="Flurstückssuche"
              align={{
                offset: [0, -6],
              }}
            >
              <button
                className="absolute border-[#0d6efd] z-[9999] bg-gradient-to-b from-[#ffffff] to-[#e0e0e0] h-[34px] w-[32px] border rounded-l-[4px]"
                onClick={() => setShowLandParcelChooser(true)}
              >
                <FontAwesomeIcon icon={faF} />
              </button>
            </Tooltip>
          )}
          <LibFuzzySearch
            gazData={gazData}
            onCLose={handleShowFIcon}
            onSelection={onGazetteerSelection}
            pixelwidth="500px"
            placeholder="Geben Sie einen Suchbegriff ein"
          />
        </div>
      )}

      <Toolbar />
    </Card>
  );
};
export default Map;

Map.propTypes = {
  /**
   * The width of the map
   */
  width: PropTypes.number,

  /**
   * The height of the map
   */
  height: PropTypes.number,

  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.object,
  /**
   * The extractor function that is used to transform the dataIn object into the data object
   */
  extractor: PropTypes.func,

  /**
   * The style of the map
   */
  mapStyle: PropTypes.object,
};
