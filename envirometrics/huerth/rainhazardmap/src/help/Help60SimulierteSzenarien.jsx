import React from "react";
import GenericModalMenuSection from "react-cismap/topicmaps/menu/Section";

const Component = ({ uiState, uiStateActions }) => {
  return (
    <GenericModalMenuSection
      uiState={uiState}
      uiStateActions={uiStateActions}
      sectionKey="szenarien"
      sectionTitle="Simulierte Szenarien"
      sectionBsStyle="info"
      sectionContent={
        <div>
          <p>
            Die berechneten Simulationen wurden mit "künstlichen" Modellregen
            durchgeführt. Dabei wird stets eine gleichartige flächenhafte
            Beregnung des gesamten Stadtgebietes angenommen.
          </p>

          <p>
            Ein <strong>Modellregen</strong> wird durch seine Dauer (in Stunden,
            abgekürzt "h"), die in dieser Zeit fallende Niederschlagsmenge (in
            Liter pro Quadratmeter, abgekürzt "l/m²") und den zeitlichen Verlauf
            der Regenintensität definiert. Für den Intensitätsverlauf gibt es
            zwei Modelle: beim sog. <strong>Blockregen</strong> ist die
            Intensität über die gesamte Dauer des Regenereignisses konstant.
            Beim <strong>Eulerregen Typ II</strong> werden in 5
            Minuten-Abschnitten unterschiedliche Intensitäten angenommen, die
            bis zur maximalen Intensität schnell und gleichmäßig ansteigen, dann
            stark abfallen und danach allmählich abklingen.
          </p>

          <p>
            Zur Einteilung der Starkregen dient der ortsbezogene{" "}
            <strong>Starkregenindex (SRI)</strong>, der Niederschläge in eine
            Skala von 1 bis 12 einteilt, vergleichbar mit der Klassifizierung
            von Erdbeben nach Mercalli. Der Starkregenindex wird durch eine
            statistische Auswertung von langfristigen Niederschlagsmessungen an
            die örtlichen Gegebenheiten angepasst. Wir benutzen hierfür die
            Aufzeichnungen des Regenschreibers der Niederschlagsstation Rondorf,
            der seit 1967 kontinuierlich betrieben wird. Starkregen mit SRI 6
            und 7 (außergewöhnliche Starkregen) haben statistische
            Wiederkehrzeiten von 50 bzw. 100 Jahren. Für noch stärkere{" "}
            <strong>extreme Starkregen</strong> lässt sich aus der Regenreihe
            Rondorf kein Wiederkehrintervall ableiten.
          </p>

          <p>
            Mit diesen Erläuterungen lassen sich unsere beiden simulierten
            Szenarien wie folgt zusammenfassen:
          </p>

          <ul>
            <li>
              <strong>Stärke 7</strong>: außergewöhnliches Starkregenereignis,
              Dauer 1 h, Niederschlag 47,3 l/m², Euler-Modellregen Typ II, SRI
              7, 100-jährliche Wiederkehrzeit
            </li>

            <li>
              <strong>Stärke 10</strong>: extremes Starkregenereignis, Dauer 1
              h, Niederschlag 90 l/m², Blockregen, SRI 10
            </li>
          </ul>
        </div>
      }
    />
  );
};
export default Component;
