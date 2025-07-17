import { Checkbox, DatePicker, Input, Select } from "antd";
import CustomCard from "../ui/Card";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  getAenderungsAnfrage,
  getKassenzeichen,
} from "../../store/slices/search";
import TextArea from "antd/es/input/TextArea";

const GeneralRow = ({
  title,
  placeholder,
  width,
  customInput,
  value,
  className = "",
}) => {
  return (
    <div className={"flex justify-between gap-2 " + className}>
      <div className="text-sm font-medium w-1/2">{title}:</div>
      {customInput ? (
        customInput
      ) : (
        <Input
          className={`${width > 365 ? "w-full" : "w-1/2"}`}
          placeholder={placeholder}
          value={value}
        />
      )}
    </div>
  );
};

const mockExtractor = () => {
  return {
    date: null,
    bemerkung: null,
    sperre: null,
    aenderungsAnfrage: null,
    kassenzeichenNummer: null,
  };
};

const General = ({
  width = 300,
  height = 200,
  style,
  extractor = mockExtractor,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const aenderungsAnfrage = useSelector(getAenderungsAnfrage);
  const data = extractor(kassenzeichen, aenderungsAnfrage);
  const dateFormat = "DD.MM.YYYY";

  return (
    <CustomCard style={{ ...style, width, height }} title="Allgemein">
      <div className="flex flex-col gap-2 h-full">
        <GeneralRow
          title="Kassenzeichen"
          width={width}
          value={data.kassenzeichenNummer}
        />
        <GeneralRow
          title="Datum der Erfassung"
          customInput={
            <DatePicker
              className={`${width > 365 ? "w-full" : "w-1/2"}`}
              format={dateFormat}
              value={data.date}
            />
          }
          width={width}
        />
        <GeneralRow
          title="Bemerkung"
          width={width}
          customInput={
            <TextArea
              className={`${width > 365 ? "w-full" : "w-1/2"}`}
              value={data.bemerkung}
            />
          }
          className="h-full"
        />
        <GeneralRow
          title="Veranlagung gesperrt"
          customInput={<Checkbox checked={data.sperre} />}
          width={width}
        />
        <GeneralRow
          title="Änderungsanfrage"
          customInput={
            <Select
              options={[
                { value: "in Bearbeitung", label: "In Bearbeitung" },
                { value: "erledigt", label: "Erledigt" },
                { value: "geschlossen", label: "Geschlossen" },
                { value: "ausstehend", label: "Ausstehend" },
                { value: "archiviert", label: "Archiviert" },
                { value: "_neue Nachricht", label: "Neue Nachricht" },
              ]}
              suffixIcon={null}
              value={data.aenderungsAnfrage}
              className={`${width > 365 ? "w-full" : "w-1/2"}`}
            />
          }
          width={width}
        />
      </div>
    </CustomCard>
  );
};

export default General;
