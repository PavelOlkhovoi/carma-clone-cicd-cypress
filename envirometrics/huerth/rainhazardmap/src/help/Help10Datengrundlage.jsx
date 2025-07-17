import React, { useContext } from "react";
import GenericModalMenuSection from "react-cismap/topicmaps/menu/Section";
import LicenseStadtplanTagNacht from "react-cismap/topicmaps/wuppertal/LicenseStadtplanTagNacht";
import LicenseLBK from "react-cismap/topicmaps/wuppertal/LicenseLuftbildkarte";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
/* eslint-disable jsx-a11y/anchor-is-valid */

const Component = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);

  return (
    <GenericModalMenuSection
      sectionKey="datengrundlage"
      sectionTitle="Datengrundlagen"
      sectionBsStyle="warning"
      sectionContent={
        <div>
          <p>
            Die Starkregengefahrenkarte Hürth stellt wahlweise die Maximalwerte
            oder den zeitlichen Verlauf von Wassertiefen oder
            Fließgeschwindigkeiten dar, die im Verlauf von simulierten
            Starkregenereignissen auftreten. Dazu wird ein Raster mit einer
            Kantenlänge von 1 m benutzt. Die Wassertiefen und
            Fließgeschwindigkeiten werden jeweils mit einem Farbverlauf
            visualisiert. Der Farbverlauf für die <strong>Wassertiefen</strong>{" "}
            benutzt die Eckwerte 20 cm (hellblau), 40 cm (blau), 75 cm
            (dunkelblau) und 100 cm (violett). Wassertiefen unter 10 cm werden
            nicht farbig ausgeprägt (transparente Darstellung). Zur
            Visualisierung der <strong>Fließgeschwindigkeiten</strong>,
            angegeben in Meter pro Sekunde (m/s), werden die Eckwerte 0,5 m/s
            (gelb), 1 m/s (orange), 2 m/s (hellrot) und 3 m/s (dunkelrot)
            verwendet. Der untere Grenzwert für die farbige Anzeige einer
            Fließgeschwindigkeit liegt bei 0,1 m/s.
          </p>

          <p>
            Die Simulationsberechnungen wurden im Auftrag der Stadtwerke Hürth
            AöR durch das Ingenieurbüro Sweco GmbH durchgeführt. Der
            Regenwasserabfluss im Kanalnetz und aus dem Kanalnetz austretendes
            Wasser wurden hierbei nicht berücksichtigt. Die Intensität der
            Starkregenereignisse übersteigt in der Regel die Bemessungsgrenze
            der Kanalnetze deutlich, so dass es zu wild oberirdisch abfließendem
            Wasser kommt. Verrohrungen und Durchlässe wurden als verlegt
            angenommen und somit als im Starkregenfall nicht hydraulisch
            wirksam. Die unterschiedlichen Abflussgeschwindigkeiten auf
            Oberflächen mit unterschiedlicher Rauhigkeit (z. B. auf einer Straße
            schneller als auf einer Wiese) wurden vereinfacht berücksichtigt.
            Die Informationen zur Oberflächenbeschaffenheit stammen dabei aus
            den Landbedeckungs- und Landnutzungsdaten des Projekts CORINE
            Landcover und dem Digitalen Basis-Landschaftsmodell NRW.
          </p>
          <p>
            Die Simulationen basieren auf dem Digitalen Geländemodell (DGM) von
            Hürth, abgeleitet aus flächenhaften Höhenmessungen, die das Land NRW
            turnusmäßig mit einem Laserscanner aus einem Flugzeug heraus
            durchführt (verwendeter Datenstand November 2022). Das DGM wurde um
            die Gebäude aus dem Hürther Liegenschaftskataster und aus dem
            amtlichen Liegenschaftskataster NRW ergänzt. Hydraulisch relevante
            Durchlässe, Brücken und Unterführungen, die in den Höhendaten nicht
            durchgängig waren, wurden geöffnet.
          </p>
          <p>
            Zur Betrachtung der Wassertiefen stellen wir Ihnen drei verschiedene
            Hintergrundkarten bereit, die auf den folgenden Geodatendiensten und
            Geodaten basieren:
          </p>

          <ul>
            <li>
              <strong>Basiskarte (grau)</strong>: Kartendienst (vektorbasiert)
              des BKG. <strong>basemap.de Web Vektor grau</strong>. Der
              Kartendienst basemap.de Web Vektor ist ein von Bund und Ländern
              gemeinsam entwickelter Kartendienst für Web und Mobil. Die
              deutschlandweite Karte wird monatlich aktualisiert, ständig
              weiterentwickelt und bietet die Qualität und Homogenität amtlicher
              Geodaten. Als Webkarte ermöglicht der Dienst freies Zoomen von der
              Deutschlandübersicht bis zu flächendeckenden 3D-Gebäudemodellen
              und amtlichen Hausnummern in modernem Design. (
              <a
                target="_legal"
                href="https://sgx.geodatenzentrum.de/web_public/gdz/lizenz/deu/basemapde_web_dienste_lizenz.pdf"
              >
                Lizenz basemap.de Web-Dienste
              </a>
              )
            </li>
            <li>
              <strong>Basiskarte (bunt)</strong>: Kartendienst (vektorbasiert)
              des BKG. <strong>basemap.de Web Vektor Relief</strong>. Der
              Kartendienst basemap.de Web Vektor ist ein von Bund und Ländern
              gemeinsam entwickelter Kartendienst für Web und Mobil. Die
              deutschlandweite Karte wird monatlich aktualisiert, ständig
              weiterentwickelt und bietet die Qualität und Homogenität amtlicher
              Geodaten. Als Webkarte ermöglicht der Dienst freies Zoomen von der
              Deutschlandübersicht bis zu flächendeckenden 3D-Gebäudemodellen
              und amtlichen Hausnummern in modernem Design. (
              <a
                target="_legal"
                href="https://sgx.geodatenzentrum.de/web_public/gdz/lizenz/deu/basemapde_web_dienste_lizenz.pdf"
              >
                Lizenz basemap.de Web-Dienste
              </a>
              )
            </li>
            <li>
              <strong>Luftbildkarte</strong>: (1) Kartendienst (WMS) des Landes
              NRW. Datengrundlage:{" "}
              <strong>Digitale Orthophotos (DOP) des Landes NRW</strong>{" "}
              WMS-Dienst für farbige, digitale, georeferenzierte, lagegenaue,
              entzerrte Luftbilder des Landes NRW. (
              <a
                target="_legal"
                href="https://www.bezreg-koeln.nrw.de/geobasis-nrw/produkte-und-dienste/luftbild-und-satellitenbildinformationen/aktuelle-luftbild-und-0"
              >
                weitere Informationen
              </a>
              ). (2) Basiskarte (bunt) (siehe oben)
            </li>
          </ul>
        </div>
      }
    />
  );
};
export default Component;
