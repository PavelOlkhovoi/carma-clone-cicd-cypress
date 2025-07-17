import { Select } from "antd";
import "./header-selector.css";
import queries from "../../../core/queries/online";
import { fetchGraphQL } from "../../../core/graphql";
import { getJWT } from "../../../store/slices/auth";
import { storeLagisLandparcel } from "../../../store/slices/lagis";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const HeaderSelectors = () => {
  // const dispatch = useDispatch();
  // const jwt = useSelector(getJWT);
  // const [gemarkung, setGemarkung] = useState(11);
  // const [bezeichnung, setBezeichnung] = useState([]);
  // const [zaehler, setZaehler] = useState([]);
  // const [activeZaehler, setActiveZaehler] = useState();
  // const [nenner, setNenner] = useState([]);
  // const [activeNenner, setActiveNenner] = useState();
  // const getNenner = async () => {
  //   const result = await fetchGraphQL(
  //     queries.nenner,
  //     {
  //       gemarkung_id: gemarkung,
  //       zaehler: activeZaehler,
  //     },
  //     jwt
  //   );
  //   if (result.status !== 401) {
  //     setActiveNenner(result.data.flurstueck_schluessel[0].flurstueck_nenner);
  //     setNenner(
  //       result.data.flurstueck_schluessel.map((n) => ({
  //         value: n.flurstueck_nenner,
  //         label: n.flurstueck_nenner,
  //       }))
  //     );
  //   }
  // };
  // const getGemarkung = async () => {
  //   const result = await fetchGraphQL(queries.gemarkung, {}, jwt);
  //   if (result.status !== 401) {
  //     setBezeichnung(
  //       result.data.gemarkung.map((g) => ({
  //         value: g.id,
  //         label: g.bezeichnung,
  //       }))
  //     );
  //   }
  //   return result;
  // };
  // const getZaehlerGemerkung = async () => {
  //   const result = await fetchGraphQL(
  //     queries.zaehler,
  //     { gemarkung_id: gemarkung },
  //     jwt
  //   );
  //   if (result.status !== 401) {
  //     setActiveZaehler(
  //       (prev) =>
  //         (prev = result.data.flurstueck_schluessel[0].flurstueck_zaehler)
  //     );

  //     setZaehler(
  //       result.data.flurstueck_schluessel.map((z) => ({
  //         value: z.flurstueck_zaehler,
  //         label: z.flurstueck_zaehler,
  //       }))
  //     );
  //   }
  // };
  // const getFlurstueck = async () => {
  //   console.log("Gemerkung", gemarkung);
  //   const result = await fetchGraphQL(
  //     queries.flurstueck,
  //     {
  //       gemarkung_id: gemarkung,
  //       flurstueck_zaehler: activeZaehler,
  //       flurstueck_nenner: activeNenner,
  //     },
  //     jwt
  //   );
  //   if (result.data.flurstueck) {
  //     dispatch(storeLandparcel(result.data.flurstueck));
  //     console.log("flurstueck", result.data.flurstueck);
  //   }
  // };

  // const handleChangeGemarkung = (value) => {
  //   console.log(`selected ${value}`);
  //   setGemarkung(value);
  // };
  // const handleChangeZaehler = (value) => {
  //   setActiveZaehler((prev) => value);
  // };
  // const handleChangeNenner = (value) => {
  //   setActiveNenner((prev) => value);
  // };
  // useEffect(() => {
  //   getGemarkung();
  //   console.log("bezeichnung", bezeichnung);
  // }, []);
  // useEffect(() => {
  //   getZaehlerGemerkung();
  // }, [gemarkung]);
  // useEffect(() => {
  //   getNenner();
  // }, [activeZaehler]);
  // useEffect(() => {
  //   getFlurstueck();
  // }, [activeNenner, activeZaehler]);
  // useEffect(() => {
  //   console.log("bezeichnung", bezeichnung);
  // }, [bezeichnung]);
  return <div></div>;
  return (
    <div className="select-header flex gap-2">
      <Select
        showSearch
        style={{ width: "200px" }}
        onChange={handleChangeGemarkung}
        filterOption={(input, option) => {
          if (option && option.label) {
            const label = option.label.toLowerCase();
            const search = input.toLowerCase();

            // Check if the label starts with the input
            return label.startsWith(search);
          }
          return false;
        }}
        // filterSort={(optionA, optionB) =>
        //   optionA.label.localeCompare(optionB.label, undefined, {
        //     sensitivity: "base",
        //   })
        // }
        options={bezeichnung}
      />
      <Select
        key={`zaehler${activeZaehler}`}
        defaultValue={activeZaehler}
        onChange={handleChangeZaehler}
        options={zaehler}
      />
      <Select
        defaultValue={activeNenner}
        key={`nenner${activeNenner}`}
        onChange={handleChangeNenner}
        options={nenner}
      />
    </div>
  );
};
export default HeaderSelectors;
