import { Checkbox, Select } from "antd";
import CustomCard from "../ui/Card";
import { getKassenzeichen } from "../../store/slices/search";
import { useSelector } from "react-redux";

const mockExtractor = (kassenzeichen) => {
  return {};
};

const Row = ({ title, data, useCheckbox }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-full items-center gap-2 text-xs text-zinc-500">
        <span className="w-3/5"></span>
        <span className="text-center">vorh.</span>
        <span className="w-full text-center">{title}</span>
      </div>
      {data.map((item, i) => (
        <div
          className="flex w-full items-center gap-2"
          key={`${item.title}_${i}`}
        >
          <span className="w-3/5 font-medium text-sm">{item.title}:</span>
          <Checkbox checked={item.vorhanden} />
          {useCheckbox ? (
            item.title !== "EVG" ? (
              <Checkbox
                className="w-full flex justify-center"
                checked={item.entleerung}
              />
            ) : (
              <span className="w-full"></span>
            )
          ) : (
            <Select
              className="w-full"
              value={item.angeschlossen}
              size="small"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const SewerConnection = ({
  width = 300,
  height = 200,
  style,
  extractor = mockExtractor,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);

  return (
    <CustomCard style={{ ...style, width, height }} title="Kanalanschluss">
      <div className="flex flex-col gap-6">
        <Row
          title="angeschlossen"
          data={[
            { title: "RK", ...data.rk },
            { title: "MKR", ...data.mkr },
            { title: "MKS", ...data.mks },
            { title: "SK", ...data.sk },
          ]}
        />
        <Row
          title="Entleerung"
          data={[
            { title: "SG", ...data.sg },
            { title: "KKA", ...data.kka },
            { title: "EVG", ...data.evg },
          ]}
          useCheckbox
        />
      </div>
    </CustomCard>
  );
};

export default SewerConnection;
