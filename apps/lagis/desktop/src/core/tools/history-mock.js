const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const historyData = [
  {
    alkis_id: "053485-013-00909",
    level: 0,
    nachfolger_alkis_id: null,
    nachfolger_name: "pseudo Schluessel17992",
    nachfolger_schluessel_id: 17992,
    schluessel_id: 17993,
    vorgaenger_alkis_id: "053485-013-00507",
    vorgaenger_name: "Beyenburg 13 507/0",
    vorgaenger_schluessel_id: 17988,
  },
  {
    alkis_id: "053485-013-00909",
    level: 0,
    nachfolger_alkis_id: null,
    nachfolger_name: "pseudo Schluessel17992",
    nachfolger_schluessel_id: 17992,
    schluessel_id: 17993,
    vorgaenger_alkis_id: "053485-013-00582",
    vorgaenger_name: "Beyenburg 13 582/0",
    vorgaenger_schluessel_id: 17989,
  },
  {
    alkis_id: "053485-013-00909",
    level: 0,
    nachfolger_alkis_id: null,
    nachfolger_name: "pseudo Schluessel17992",
    nachfolger_schluessel_id: 17992,
    schluessel_id: 17993,
    vorgaenger_alkis_id: "053485-013-00583",
    vorgaenger_name: "Beyenburg 13 583/0",
    vorgaenger_schluessel_id: 17990,
  },
  {
    alkis_id: "053485-013-00909",
    level: 0,
    nachfolger_alkis_id: null,
    nachfolger_name: "pseudo Schluessel17992",
    nachfolger_schluessel_id: 17992,
    schluessel_id: 17993,
    vorgaenger_alkis_id: "053485-013-00585",
    vorgaenger_name: "Beyenburg 13 585/0",
    vorgaenger_schluessel_id: 17991,
  },
  {
    alkis_id: "053485-013-00909",
    level: 0,
    nachfolger_alkis_id: "053485-013-00909",
    nachfolger_name: "Beyenburg 13 909/0",
    nachfolger_schluessel_id: 17993,
    schluessel_id: 17993,
    vorgaenger_alkis_id: null,
    vorgaenger_name: "pseudo Schluessel17992",
    vorgaenger_schluessel_id: 17992,
  },
  {
    alkis_id: "053485-013-00909",
    level: 1,
    nachfolger_alkis_id: "053485-013-00927",
    nachfolger_name: "Beyenburg 13 927/0",
    nachfolger_schluessel_id: 21838,
    schluessel_id: 17993,
    vorgaenger_alkis_id: "053485-013-00909",
    vorgaenger_name: "Beyenburg 13 909/0",
    vorgaenger_schluessel_id: 17993,
  },
];

const addedNodes = new Set();

export const initialNodesData = [];
export const initialEdgesData = [];
const initialObject = "Beyenburg 13 909/0";
const secondDarstellung = "Vorgänger";
// const secondDarstellung = "Nachfolger";
// const secondDarstellung = "All";
// const firstDarstellung = "Direkte";
// const firstDarstellung = "Begrenzte";
// const firstDarstellung = "All";
const begrenzteTiefe = 1;

historyData.forEach((item, idx) => {
  const { nachfolger_name, vorgaenger_name, level } = item;
  if (level < 1 && secondDarstellung === "Nachfolger") {
    if (historyData.length - 1 === idx && initialNodesData.length === 0) {
      initialNodesData.push({
        id: vorgaenger_name.replace(/\s/g, ""),
        data: {
          label: initialObject,
          root: true,
        },
        position,
        // style: { background: "#E1F1FF" },
      });
    }
    return;
  }

  if (level > 0 && secondDarstellung === "Vorgänger") {
    return;
  }

  if (level != 0 && level != 1 && firstDarstellung === "Direkte") {
    return;
  }

  if (
    (level > begrenzteTiefe || level <= -1 * begrenzteTiefe) &&
    firstDarstellung === "Begrenzte"
  ) {
    return;
  }

  const nodeStyle = {};
  if (!addedNodes.has(vorgaenger_name)) {
    if (vorgaenger_name === initialObject) {
      // nodeStyle.background = "#E1F1FF";
    }
    initialNodesData.push({
      id: vorgaenger_name.replace(/\s/g, ""),
      data: {
        label: vorgaenger_name.startsWith("pseudo ") ? "   " : vorgaenger_name,
        root: vorgaenger_name === initialObject,
      },
      position,
    });

    addedNodes.add(vorgaenger_name);
  }

  if (!addedNodes.has(nachfolger_name)) {
    if (nachfolger_name.startsWith("pseudo ")) {
      nodeStyle.height = 34;
    }
    if (nachfolger_name === initialObject) {
      // nodeStyle.background = "#E1F1FF";
    }
    initialNodesData.push({
      id: nachfolger_name.replace(/\s/g, ""),
      type: "default",
      data: {
        label: nachfolger_name.startsWith("pseudo ") ? "   " : nachfolger_name,
        root: nachfolger_name === initialObject,
      },
      position,
      style: nodeStyle,
    });

    addedNodes.add(nachfolger_name);
  }

  if (vorgaenger_name !== nachfolger_name) {
    initialEdgesData.push({
      id: idx,
      source: vorgaenger_name.replace(/\s/g, ""),
      target: nachfolger_name.replace(/\s/g, ""),
      type: edgeType,
      animated: true,
    });
  }
});

const addStyleToRootNode = initialNodesData.find((n) => n.data.root);
addStyleToRootNode.style = { background: "#E1F1FF" };

// [
//   {
//     alkis_id: "053485-013-00927",
//     level: -1,
//     nachfolger_alkis_id: null,
//     nachfolger_name: "pseudo Schluessel17992",
//     nachfolger_schluessel_id: 17992,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: "053485-013-00507",
//     vorgaenger_name: "Beyenburg 13 507/0",
//     vorgaenger_schluessel_id: 17988,
//   },
//   {
//     alkis_id: "053485-013-00927",
//     level: -1,
//     nachfolger_alkis_id: null,
//     nachfolger_name: "pseudo Schluessel17992",
//     nachfolger_schluessel_id: 17992,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: "053485-013-00582",
//     vorgaenger_name: "Beyenburg 13 582/0",
//     vorgaenger_schluessel_id: 17989,
//   },
//   {
//     alkis_id: "053485-013-00927",
//     level: -1,
//     nachfolger_alkis_id: null,
//     nachfolger_name: "pseudo Schluessel17992",
//     nachfolger_schluessel_id: 17992,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: "053485-013-00583",
//     vorgaenger_name: "Beyenburg 13 583/0",
//     vorgaenger_schluessel_id: 17990,
//   },
//   {
//     alkis_id: "053485-013-00927",
//     level: -1,
//     nachfolger_alkis_id: null,
//     nachfolger_name: "pseudo Schluessel17992",
//     nachfolger_schluessel_id: 17992,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: "053485-013-00585",
//     vorgaenger_name: "Beyenburg 13 585/0",
//     vorgaenger_schluessel_id: 17991,
//   },
//   {
//     alkis_id: "053485-013-00927",
//     level: -1,
//     nachfolger_alkis_id: "053485-013-00908",
//     nachfolger_name: "Beyenburg 13 908/0",
//     nachfolger_schluessel_id: 17987,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: "053485-013-00586",
//     vorgaenger_name: "Beyenburg 13 586/0",
//     vorgaenger_schluessel_id: 11685,
//   },
//   {
//     alkis_id: "053485-013-00927",
//     level: -1,
//     nachfolger_alkis_id: "053485-013-00908",
//     nachfolger_name: "Beyenburg 13 908/0",
//     nachfolger_schluessel_id: 17987,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: "053485-013-00587",
//     vorgaenger_name: "Beyenburg 13 587/0",
//     vorgaenger_schluessel_id: 11686,
//   },
//   {
//     alkis_id: "053485-013-00927",
//     level: -1,
//     nachfolger_alkis_id: "053485-013-00909",
//     nachfolger_name: "Beyenburg 13 909/0",
//     nachfolger_schluessel_id: 17993,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: null,
//     vorgaenger_name: "pseudo Schluessel17992",
//     vorgaenger_schluessel_id: 17992,
//   },
//   {
//     alkis_id: "053485-013-00927",
//     level: 0,
//     nachfolger_alkis_id: "053485-013-00927",
//     nachfolger_name: "Beyenburg 13 927/0",
//     nachfolger_schluessel_id: 21838,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: "053485-013-00584",
//     vorgaenger_name: "Beyenburg 13 584/0",
//     vorgaenger_schluessel_id: 11684,
//   },
//   {
//     alkis_id: "053485-013-00927",
//     level: 0,
//     nachfolger_alkis_id: "053485-013-00927",
//     nachfolger_name: "Beyenburg 13 927/0",
//     nachfolger_schluessel_id: 21838,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: "053485-013-00588",
//     vorgaenger_name: "Beyenburg 13 588/0",
//     vorgaenger_schluessel_id: 11687,
//   },
//   {
//     alkis_id: "053485-013-00927",
//     level: 0,
//     nachfolger_alkis_id: "053485-013-00927",
//     nachfolger_name: "Beyenburg 13 927/0",
//     nachfolger_schluessel_id: 21838,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: "053485-013-00908",
//     vorgaenger_name: "Beyenburg 13 908/0",
//     vorgaenger_schluessel_id: 17987,
//   },
//   {
//     alkis_id: "053485-013-00927",
//     level: 0,
//     nachfolger_alkis_id: "053485-013-00927",
//     nachfolger_name: "Beyenburg 13 927/0",
//     nachfolger_schluessel_id: 21838,
//     schluessel_id: 21838,
//     vorgaenger_alkis_id: "053485-013-00909",
//     vorgaenger_name: "Beyenburg 13 909/0",
//     vorgaenger_schluessel_id: 17993,
//   },
// ];
