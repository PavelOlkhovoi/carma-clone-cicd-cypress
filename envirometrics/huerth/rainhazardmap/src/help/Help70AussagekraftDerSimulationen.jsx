import React, { useContext } from "react";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import GenericModalMenuSection from "react-cismap/topicmaps/menu/Section";
/* eslint-disable jsx-a11y/anchor-is-valid */

const Component = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);

  return (
    <GenericModalMenuSection
      sectionKey="aussagekraft"
      sectionTitle="Aussagekraft der Simulationen"
      sectionBsStyle="info"
      sectionContent={
        <div>
          <p>
            Unsere Starkregengefahrenkarte zeigt die Ergebnisse von
            Simulationen, die dem heutigen Stand der Technik entsprechen. Die
            Berechnungen basieren auf einem vereinfachten Modell der
            tatsächlichen Verhältnisse. Für eine noch differenziertere
            Modellierung fehlen zum einen die Daten, zum anderen ließe sich die
            automatisierte Berechnung nicht mehr in erlebbarer Zeit durchführen!{" "}
          </p>

          <p>
            Was sind die wichtigsten Vereinfachungen, die wir vornehmen mussten?
          </p>

          <ul>
            <li>
              Das abfließende Regenwasser findet in 
              <strong>Kellergeschossen</strong>, die als sog. 
              <strong>Retentionsräume</strong> wirken, ein Rückhaltevolumen, das
              wir nicht berücksichtigt haben. Hierzu fehlen uns die Daten. Es
              ist wegen der unbekannten Eintrittspunkte auch nicht modellierbar,
              in welche Kellergeschosse tatsächlich Wasser hineinlaufen würde!
            </li>

            <li>
              Teile des Regenwassers können in der Realität durch{" "}
              <strong>Verdunstung</strong> verschwinden. Diesen Effekt haben wir
              aus fachlichen Gründen bewusst vernachlässigt. Die Verdunstung
              spielt im Starkregenfall nur eine untergeordnete Rolle.
            </li>
            <li>
              Für die Berechnungen wurde eine{" "}
              <strong>Versickerungsfähigkeit</strong> der natürlichen Flächen
              vernachlässigt, da die Intensität der Starkregenereignisse die
              Infiltrationskapazität der Böden erfahrungsgemäß deutlich
              übersteigt.
            </li>
          </ul>
          <p>
            <strong>
              Aufgrund der getroffenen Vereinfachungen ergibt sich eine Tendenz
              zur lokalen Überzeichnung der Wassertiefen, die sich bei einem
              realen Regen der angenommenen Stärke einstellen{" "}
            </strong>
          </p>
          <p>
            Um diesem Umstand Rechnung zu tragen, geben wir bei der{" "}
            <a
              class="renderAsLink"
              onClick={() => setAppMenuActiveMenuSection("wasserstand")}
            >
              Abfrage der Wassertiefe oder der Fließgeschwindigkeit
            </a>{" "}
            ab einer berechneten Wassertiefe von 150 cm nur noch "größer als 150
            cm" ({">"} 150 cm) und ab einer berechneten Fließgeschwindigkeit von
            6 m/s nur noch "{">"} 6 m/s" als Ergebnis an.
          </p>

          <p>
            Außerdem wurde die Wirkung des Kanalnetzes, das einen Teil des
            Starkregens abführen kann, vernachlässigt. Hierdurch kann es zu
            Abweichungen zwischen den Simulationsergebnissen und den
            Überflutungen durch ein reales Regenereignis kommen.
          </p>

          <p>
            Auch das Digitale Geländemodell (DGM), das für die Simulationen als
            Grundlage dient, kann Fehler aufweisen. Helfen Sie uns dabei, das
            DGM sukzessive zu verbessern, indem Sie uns vermutete{" "}
            <a
              class="renderAsLink"
              onClick={() => setAppMenuActiveMenuSection("modellfehlermelden")}
            >
              Fehler im Geländemodell melden
            </a>
            ! Zuletzt kann es sein, dass ein bestehendes Gebäude in den
            Simulationen nicht berücksichtigt wurde, weil es zum Zeitpunkt der
            Datenbereitstellung für die Simulationsberechnungen noch nicht im
            Liegenschaftskataster nachgewiesen war.
          </p>
        </div>
      }
    />
  );
};
export default Component;
