import { useSelector } from "react-redux";
import CustomCard from "../ui/Card";
import { getKassenzeichen } from "../../store/slices/search";

const mockExtractor = (kassenzeichen) => {
  return [
    {
      title: "Bewertung",
      items: [],
    },
    {
      title: "Anschlussgrad",
      items: [],
    },
  ];
};

const Sums = ({
  width = 300,
  height = 200,
  style,
  extractor = mockExtractor,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);

  return (
    <CustomCard style={{ ...style, width, height }} title="Summen">
      {data.map((categories, i) => (
        <div key={`sum_categories_${i}`} className="flex flex-col gap-1">
          <div className={`font-medium ${i > 0 && "pt-4"}`}>
            {categories.items.length > 0 && categories.title}
          </div>
          {categories.items.map((item, i) => (
            <div
              key={`sum_items_${i}`}
              className="flex justify-between w-full items-center text-sm 3xl:text-base py-1 hover:bg-zinc-100"
            >
              <div>{item.type}</div>
              <div>{item.size} m²</div>
            </div>
          ))}
        </div>
      ))}
    </CustomCard>
  );
};

export default Sums;
