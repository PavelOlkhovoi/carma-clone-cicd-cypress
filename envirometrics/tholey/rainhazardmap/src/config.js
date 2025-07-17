import { starkregenConstants } from "@cismet-dev/react-cismap-envirometrics-maps/constants";
import citymapGrey from "./assets/images/rain-hazard-map-bg/citymapGrey.png";
import citymapBg from "./assets/images/rain-hazard-map-bg/citymap.png";
import orthoBg from "./assets/images/rain-hazard-map-bg/ortho.png";

const overridingBaseLayerConf = {
  namedStyles: {
    default: { opacity: 1.0 },
    night: {
      opacity: 0.9,
      "css-filter": "filter:grayscale(0.9)brightness(0.9)invert(1)",
    },
    blue: {
      opacity: 1.0,
      "css-filter":
        "filter:sepia(0.5) hue-rotate(155deg) contrast(0.9) opacity(0.9) invert(0)",
    },
  },
  defaults: {
    wms: {
      format: "image/png",
      tiled: "true",
      maxZoom: 22,
      opacity: 0.6,
      version: "1.1.1",
    },
  },
  namedLayers: {
    rvr: {
      type: "wms",
      url: "https://geodaten.metropoleruhr.de/spw2/service",
      layers: "spw2_light",
      tiled: "false",
      version: "1.3.0",
    },
    //
    slDOP: {
      type: "wms",
      url: "https://geoportal.saarland.de/freewms/dop?SERVICE=WMS&VERSION=1.1.1",
      layers: "sl_dop",
      tiled: "false",
      version: "1.1.1",
      pane: "backgroundLayers",
    },
    slOpenDOP: {
      type: "wms",
      url: "https://geoportal.saarland.de/freewms/dop",
      layers: "sl_dop",
      tiled: "false",
      version: "1.1.1",
      pane: "backgroundLayers",
    },
    slOpenTrueDOP: {
      type: "wms",
      url: "https://geoportal.saarland.de/freewms/truedop",
      layers: "sl_dop20_rgb",
      tiled: "false",
      version: "1.1.1",
      pane: "backgroundLayers",
    },
    slDOPlic: {
      type: "wms",
      url: "https://dop-sl-tholey-usage-only-allowed-with-rainhazardmap-tholey.cismet.de?forceBasicAuth=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap",
      tiled: "true",
      version: "1.1.1",
      layers: "sl_dop20_rgb",
      // pane: "backgroundLayers",
      // attribution: "Luftbild: &copy; LVGL",
    },
    slDOPlicAlt: {
      type: "wms",
      url: "https://dop-sl-tholey-usage-only-allowed-with-rainhazardmap-tholey.cismet.de/alternative?forceBasicAuth=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap",
      tiled: "true",
      version: "1.1.1",
      layers: "sl_dop20_rgb",

      // pane: "backgroundLayers",
      // attribution: "Luftbild: &copy; LVGL",
    },
    slDOPcismet: {
      type: "wms",
      url: "https://lvgl-saar-ortho.cismet.de/geoserver/ows?&version=1.1.1",
      transparent: "true",
      layers: "ortho:tholey_ortho",
      styles: "ortho:rgb",
      tiled: "false",
      version: "1.1.1",
      pane: "backgroundLayers",
      attribution: "Luftbild: &copy; LVGL Saarland",
    },
    slDOPcismet2: {
      type: "wms",
      url: "https://lvgl-saar-ortho.cismet.de/geoserver/ows?&version=1.1.1",
      transparent: "true",
      layers: "ortho:tholey_ortho_pyramid",
      styles: "ortho:rgb",
      tiled: "false",
      version: "1.1.1",
      pane: "backgroundLayers",
      attribution: "Luftbild: &copy; LVGL Saarland",
    },

    basemap_de: {
      type: "vector",
      opacity: 1,
      attribution:
        'Hintergrundkarte &copy; <a href="https://basemap.de/web-vektor/">basemap.de</a> Vektorkarte',
      style:
        "https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json",
      pane: "backgroundvectorLayers",
    },
    basemap_de_relief: {
      type: "vector",
      opacity: 1,
      attribution:
        'Hintergrundkarte &copy; <a href="https://basemap.de/web-vektor/">basemap.de</a> Vektorkarte',
      style:
        "https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_top.json",
      pane: "backgroundvectorLayers",
    },
    basemap_de_grau: {
      type: "vector",
      opacity: 1,
      attribution:
        'Hintergrundkarte &copy; <a href="https://basemap.de/web-vektor/">basemap.de</a> Vektorkarte',
      style:
        "https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_gry.json",
      pane: "backgroundvectorLayers",
    },

    cismetLight: {
      type: "vector",
      opacity: 1,
      attribution:
        'Hintergrundkarte basierend auf &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> Vektorkarte',
      style: "https://omt-germany.cismet.de/styles/cismet-light/style.json",
      pane: "backgroundvectorLayers",
    },
    cismetText: {
      type: "vector",
      style: "https://omt.map-hosting.de/styles/cismet-text/style.json",
      pane: "backgroundlayerTooltips",
      attribution:
        'Hintergrundkarte basierend auf &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> Vektorkarte',
    },
    cismetBasic: {
      type: "vector",
      opacity: 1,
      attribution:
        'Hintergrundkarte basierend auf &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> Vektorkarte',
      style: "https://omt.map-hosting.de/styles/cismet-basic/style.json",
      pane: "backgroundvectorLayers",
    },

    dir: {
      type: "wms",
      opacity: 1,
      transparent: true,
      url: "https://starkregen-tholey.cismet.de/geoserver/wms?SERVICE=WMS",
      layers: "starkregen:sri7_direction",
      tiled: "false",
      version: "1.1.1",
    },
  },
};

const config = {
  upperleftX: 768136.865,
  upperleftY: 6366376.79,
  pixelsize: 1.538367850903386,
  minAnimationZoom: 17,
  minFeatureInfoZoom: 19,
  rasterfariURL: "https://rasterfari-tholey.cismet.de",
  modelWMS: "https://starkregen-tholey.cismet.de/geoserver/wms?SERVICE=WMS",

  simulations: [
    {
      getLayer: (state) => "starkregen:sri7_depth",
      depthLayer: "starkregen:sri7_depth",
      velocityLayer: "starkregen:sri7_velocity",
      directionsLayer: "starkregen:sri7_direction",
      depthStyle: "starkregen:depth-blue",
      velocityStyle: "starkregen:velocity",
      directionStyle: "starkregen:direction",
      animation: "sri7/",
      name: "Stärke 7",
      title: "Starkregen SRI 7 (56,3 l/m² in 1h)",
      icon: "bar-chart",
      subtitle:
        "Simulation eines einstündigen Starkregens mit 56,3 Liter/m² Niederschlag (Starkregenindex SRI 7) in der Gemeinde Tholey, statistische Wiederkehrzeit 100 Jahre",
    },

    {
      getLayer: (state) => "",
      depthLayer: "",
      velocityLayer: "",
      directionsLayer: "",
      depthStyle: "",
      velocityStyle: "",
      directionStyle: "",
      animation: "xxx/",
      name: "Aus",
      title: "Kein Lastfall ausgewählt",
      icon: "bar-chart",
      subtitle: "wählen Sie einen Lastfall aus",
    },
    {
      additionalLayerConfig: true,
      name: "Gebäudegefährdung",
      layer: "Geb_Pegel_max",
      style: "starkregen:gebaeude",
      title: "Gebäudegefährdung",
      icon: "home",
      subtitle: "wählen Sie einen Lastfall aus",
    },
  ],
  backgrounds: [
    {
      layerkey: "basemap_de_grau@30",
      src: citymapGrey,
      title: "Basiskarte (grau)",
    },

    {
      layerkey: "basemap_de_relief@40",
      src: citymapBg,
      title: "Basiskarte (bunt)",
    },
    // {
    //   layerkey: "slDOPlic@80|cismetBasic",
    //   src: "/images/rain-hazard-map-bg/ortho.png",
    //   title: "Luftbildkarte",
    // },
    // {
    //   layerkey: "slDOPcismet@80|cismetBasic",
    //   src: "/images/rain-hazard-map-bg/ortho.png",
    //   title: "Luftbildkarte",
    // },
    {
      layerkey: "slDOPcismet2@80|basemap_de_relief@20",
      src: orthoBg,
      title: "Luftbildkarte",
    },
    // {
    //   layerkey: "slOpenDOP@80|basemap_de_relief@20",
    //   src: "/images/rain-hazard-map-bg/ortho.png",
    //   title: "Luftbildkarte",
    // },
    // {
    //   layerkey: "slOpenTrueDOP@80|basemap_de_relief@20",
    //   src: "/images/rain-hazard-map-bg/ortho.png",
    //   title: "Luftbildkarte",
    // },
  ],
  backgroundsOff: [
    {
      layerkey: "slDOP@60|cismetBasic",
      src: orthoBg,
      title: "Luftbildkarte",
    },
  ],
  heightsLegend: [
    { title: "10 cm", lt: 0.1, bg: "#88B2EA" },
    { title: "30 cm", lt: 0.3, bg: "#508CE0" },
    { title: "50 cm", lt: 0.5, bg: "#3266B4" },
    { title: "100 cm", lt: 1.0, bg: "#5018B3" },
  ],
  velocityLegend: [
    { title: "0.5 m/s", lt: 0.1, bg: "#BEC356" },
    { title: "1 m/s", lt: 1, bg: "#DA723E" },
    { title: "2 m/s", lt: 3, bg: "#D64733" },
    { title: "4 m/s", lt: 5, bg: "#8F251B" },
  ],
  heightsLegendAlt: [
    { title: "20 cm", lt: 0.1, bg: "#AFCFF9" },
    { title: "40 cm", lt: 0.3, bg: "#FED27B" },
    { title: "75 cm", lt: 0.5, bg: "#E9B279" },
    { title: "100 cm", lt: 1.0, bg: "#DD8C7B" },
  ],
  velocityLegendAlt: [
    { title: "0.5 m/s", lt: 0.1, bg: "#BEC356" },
    { title: "2 m/s", lt: 1, bg: "#DA723E" },
    { title: "4 m/s", lt: 3, bg: "#D64733" },
    { title: "6 m/s", lt: 5, bg: "#8F251B" },
  ],
  additionalLegends: {
    Geb_Pegel_max: {
      legend: [
        { title: "≦ 0.25 m", lt: 0.25, bg: "#B2B5B7" },
        { title: "≦ 0.50 m", lt: 0.5, bg: "#FABE28" },
        { title: "≦ 1.00 m", lt: 1, bg: "#FF8A00" },
        { title: "> 1.00 m", lt: 5, bg: "#FF003C" },
      ],
      title: "Legende Gebäudegefährdung",
    },
  },
};

const initialState = {
  displayMode: starkregenConstants.SHOW_HEIGHTS,
  modelLayerProblem: false,
  featureInfoModeActivated: false,
  currentFeatureInfoValue: undefined,
  currentFeatureInfoSelectedSimulation: undefined,
  currentFeatureInfoPosition: undefined,
  minifiedInfoBox: false,
  selectedSimulation: 0,
  backgroundLayer: undefined,
  selectedBackground: 0,
  animationEnabled: true,
  additionalLayers: ["Geb_Pegel_max"],
};

export default { config, overridingBaseLayerConf, initialState };
