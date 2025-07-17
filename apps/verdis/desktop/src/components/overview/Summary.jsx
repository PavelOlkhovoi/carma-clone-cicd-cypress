import { useSelector } from "react-redux";
import { getKassenzeichen } from "../../store/slices/search";
import CustomCard from "../ui/Card";

const mockExtractor = () => {
  return null;
};

const Summary = ({
  width = 300,
  height = 200,
  style,
  extractor = mockExtractor,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);

  return (
    <CustomCard style={{ ...style, width, height }} title="ESW Zusammenfassung">
      <div className="flex flex-col gap-1">
        {kassenzeichen?.frontenArray?.length > 0 && (
          <div className={`font-medium`}>Reinigung</div>
        )}
        {data?.map((front, i) => (
          <div
            key={`sum_items_${i}`}
            className="flex w-full items-center text-sm hover:bg-zinc-100 py-1"
          >
            <div className="w-full">{front.key}</div>
            <div className="w-full">#{front.streetNumber}</div>
            <div className="w-full">{front.streetName}</div>
            <div className="w-1/2 text-right">{front.length}m</div>
          </div>
        ))}
      </div>
    </CustomCard>
  );
};

export default Summary;
