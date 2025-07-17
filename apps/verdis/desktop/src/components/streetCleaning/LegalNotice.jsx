import { Checkbox } from "antd";
import CustomCard from "../ui/Card";
import { useState } from "react";
import { getKassenzeichen } from "../../store/slices/search";
import { useSelector } from "react-redux";

const extractor = (kassenzeichen) => {
  return [];
};

const Row = ({ title, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div
      className="w-full flex justify-between items-center cursor-pointer"
      onClick={() => setIsChecked(!isChecked)}
    >
      <span>{title}</span>
      <Checkbox checked={isChecked} />
    </div>
  );
};

const LegalNotice = ({ width = 300, height = 200, style }) => {
  const kassenzeichen = useSelector(getKassenzeichen);

  return (
    <CustomCard style={{ ...style, width, height }} title="Rechtliche Hinweise">
      <div className="flex flex-col gap-1 p-2">
        <Row
          title="Grunddienstbarkeit"
          checked={kassenzeichen?.grunddienstbarkeit}
        />

        <Row title="Baulasten" checked={kassenzeichen?.baulasten} />

        <Row title="Quadratwurzel" checked={kassenzeichen?.quadratwurzel} />

        <Row
          title="keine gesicherte Erschließung"
          checked={kassenzeichen?.keine_gesicherte_erschliessung}
        />
      </div>
    </CustomCard>
  );
};

export default LegalNotice;
