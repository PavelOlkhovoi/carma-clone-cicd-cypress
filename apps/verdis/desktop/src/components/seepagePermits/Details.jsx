import { Checkbox, Select } from "antd";
import CustomCard from "../ui/Card";
import { DetailsRow } from "../sealedSurfaces/Details";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { getSeepage } from "../../store/slices/search";
import { formatDate } from "../../tools/helper";

const mockExtractor = (kassenzeichen) => {
  return [];
};

const Details = ({
  dataIn,
  extractor = mockExtractor,
  width = 400,
  height = 600,
  style,
}) => {
  const data = useSelector(getSeepage);

  return (
    <CustomCard style={{ ...style, width, height }} title="Details">
      <div className="flex flex-col gap-2 h-full">
        <DetailsRow title="Aktenzeichen" value={data?.aktenzeichen} />
        <DetailsRow title="Antrag vom" value={formatDate(data?.seepageFrom)} />
        <DetailsRow title="Gültig bis" value={formatDate(data?.seepageUntil)} />
        <DetailsRow
          title="Nutzung"
          customInput={
            <Select className="w-full" size="small" value={data?.useCase} />
          }
        />
        <DetailsRow
          title="Tzp"
          customInput={
            <Select className="w-full" size="small" value={data?.type} />
          }
        />
        <DetailsRow title="Q [l/s]" value={data?.seepage} />
        <DetailsRow
          title="G-Verh."
          customInput={<Checkbox checked={data?.gVerh} />}
        />
        <DetailsRow
          title="Bemerkung"
          size="small"
          customInput={<TextArea className="w-full" value={data?.bemerkung} />}
        />
        <DetailsRow title="Gewässername" value={data?.gewaessername} />
        <DetailsRow
          title="Querverweise"
          size="small"
          customInput={<TextArea className="w-full" />}
        />
      </div>
    </CustomCard>
  );
};

export default Details;
