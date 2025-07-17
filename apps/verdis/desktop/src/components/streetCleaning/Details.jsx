import { Checkbox, Input, Select } from "antd";
import CustomCard from "../ui/Card";
import { useSelector } from "react-redux";
import { getFrontenId, getKassenzeichen } from "../../store/slices/search";
import TextArea from "antd/es/input/TextArea";
import { formatDate } from "../../tools/helper";
import { useEffect, useState } from "react";

const mockExtractor = (input) => {
  return [];
};

const DetailsRow = ({ title, value, customInput }) => {
  return (
    <div className="w-full flex justify-between">
      <span className="text-sm font-medium w-1/2">{title}:</span>
      <div className="w-1/2">
        {customInput ? customInput : <Input value={value} size="small" />}
      </div>
    </div>
  );
};

const Details = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const selectedId = useSelector(getFrontenId);
  const fronten = extractor(kassenzeichen);
  const [front, setFront] = useState({});

  useEffect(() => {
    if (fronten) {
      setFront(fronten.find((value) => value.id === selectedId));
    }
  }, [selectedId]);

  return (
    <CustomCard style={{ ...style, width, height }} title="Details">
      <div className="flex flex-col gap-1">
        <DetailsRow title="Nummer" value={front?.nummer} />
        <DetailsRow title="Länge (Grafik)" value={front?.laengeGrafik} />
        <DetailsRow title="Länge (Korrektur)" value={front?.laengeKorrektur} />
        <DetailsRow title="Bearbeitet durch" value={front?.bearbeitetDurch} />
        <DetailsRow
          title="Erfassungsdatum"
          value={formatDate(front?.erfassungsdatum)}
        />
        <DetailsRow
          title="Straße"
          customInput={
            <Select className="w-full" size="small" value={front?.straße} />
          }
        />
        <DetailsRow
          title="Lage"
          customInput={
            <Select className="w-full" size="small" value={front?.lage} />
          }
        />
        <DetailsRow
          title="Straßenreinigung"
          customInput={
            <Select
              className="w-full"
              size="small"
              value={front?.straßenReinigung}
            />
          }
        />
        <DetailsRow
          title="Bemerkung"
          customInput={<TextArea className="w-full" value={front?.bemerkung} />}
        />
        <DetailsRow title="Veranlagung" value={front?.veranlagung} />
        <div className="w-full flex justify-center items-center">
          <Checkbox
            className="w-full font-medium text-sm"
            checked={front?.garageStellplatz}
          >
            Garage/Stellplatz
          </Checkbox>
          <Checkbox
            checked={front?.anteil}
            className="w-full font-medium text-sm"
          >
            Anteil
          </Checkbox>
        </div>
        <DetailsRow title="Winkel" value={front?.winkel} />
      </div>
    </CustomCard>
  );
};

export default Details;
