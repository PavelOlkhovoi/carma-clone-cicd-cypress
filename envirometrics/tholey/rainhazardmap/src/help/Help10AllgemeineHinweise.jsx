import React, { useContext } from "react";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import GenericModalMenuSection from "react-cismap/topicmaps/menu/Section";

/* eslint-disable jsx-a11y/anchor-is-valid */

const Component = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);

  return (
    <GenericModalMenuSection
      sectionKey="allgemeineHinweise"
      sectionTitle="Allgemeine Hinweise"
      sectionBsStyle="warning"
      sectionContent={
        <div>
          <p>
            Die Starkregengefahrenkarte der Gemeinde Tholey stellt einerseits
            die maximalen Wassertiefen anderseits die maximalen
            Fließgeschwindigkeiten im Gemeindegebiet dar, die im Verlauf eines
            simuliertes Starkregenereignisses berechnet wurden. Über die
            Schaltfläche „maximale Wassertiefen“ bzw. „maximale
            Fließgeschwindigkeiten“ kann zwischen den beiden Ansichten
            gewechselt werden.
          </p>
          <p>
            Die simulierten Ergebnisse versuchen die Realität möglichst genau
            abzubilden, allerdings sind bei der Betrachtung und Interpretation
            der Ergebnisse die Datengrundlagen und -annahmen zu berücksichtigen.
            Hinweise zu den Datengrundlagen und zur Aussagekraft der Ergebnisse
            werden nachfolgend beschrieben.
          </p>
          <p>
            Das Ergebnis der Simulation ist von der Dauer und Intensität des
            Regens abhängig. Das dargestellte Szenario zeigt ein
            Niederschlagsereignis, das laut Statistik alle 100 Jahre auftreten
            kann, mit einer Niederschlagsmenge von 56,4 mm über eine Dauer von 1
            Stunde (SRI 7). Die Simulationszeit beträgt 3 Stunden.
          </p>
          <p>
            Der Farbverlauf für die <strong>Wassertiefen</strong> nutzt die
            Eckwerte:
            <ul>
              <li>20 cm - hellblau </li>
              <li>40 cm - blau</li>
              <li>75 cm - dunkelblau</li>
              <li>&gt; 100 cm - violett</li>
            </ul>
            Wassertiefen unter 5 cm werden nicht mehr farbig ausgeprägt
            (transparente Darstellung).{" "}
          </p>
          <p>
            Zur Visualisierung der <strong>Fließgeschwindigkeiten</strong>,
            angegeben in Meter pro Sekunde (m/s), werden die folgende Eckwerte
            verwendet:
            <ul>
              <li>0,5 m/s - gelb</li>
              <li>1,0 m/s - orange</li>
              <li>2,0 m/s - hellrot</li>
              <li>4,0 m/s - dunkelrot</li>
            </ul>
            Der untere Grenzwert für die farbige Anzeige einer
            Fließgeschwindigkeit liegt bei 0,2 m/s.
          </p>
          <p>
            Zusätzlich zu den maximalen Wassertiefen und zu den maximalen
            Fließgeschwindigkeiten informiert die Starkregengefahrenkarte über
            das <strong>Gefährdungspotenzial der Gebäude</strong> in der
            Gemeinde Tholey. Übersteigt der Wasserstand im Umkreis von 1 m um
            ein Gebäude die folgenden Werte werden die Gebäude entsprechend
            farblich dargestellt:
            <ul>
              <li>&lt; 0,25 m – schwarz</li>
              <li>0,5 m – gelb </li>
              <li>1,0 m – orange </li>
              <li>&gt; 1,0 m – rot</li>
            </ul>
          </p>
          <p>
            Die Starkregengefahrenkarte der Gemeinde Tholey wurde im Rahmen des
            Projektes Klimaanpassungsnetzwerk Tholey (KAN-T) durch die IZES
            gGmbH erarbeitet. Das Projekt KAN-T wurde durch das
            Bundesministerium für Umwelt, Naturschutz, nukleare Sicherheit und
            Verbraucherschutz (BMUV) über die Förderrichtlinie "Maßnahmen zur
            Anpassung an die Folgen des Klimawandels" gefördert. Das Projekt
            wurde im April 2022 abgeschlossen.
          </p>
          <p>
            Die Gemeinde Tholey hat sich nach Projektende dazu entschlossen sich
            weiterhin der Thematik „Anpassung an den Klimawandel“ zu widmen und
            initiierte das Folgeprojekt KAN-T II, welches durch LEADER gefördert
            wird. KAN-T II legt den Fokus auf die Information, Sensibilisierung
            und Beratung der Bürgerinnen und Bürger der Gemeinde Tholey. Ein
            essentieller Baustein von KAN-T II ist diese Visualisierung der
            Starkregengefahrenkarte auf der Homepage der Gemeinde Tholey.
          </p>
        </div>
      }
    />
  );
};
export default Component;
