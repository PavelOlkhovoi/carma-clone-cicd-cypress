import { useSelector } from "react-redux";
import { getHoveredProperties } from "../../store/slices/mapping";
import { isEmpty } from "lodash";

const Toolbar = () => {
  const properties = useSelector(getHoveredProperties);

  const removeLeadingZeros = (number) => {
    return number?.replace(/^0+/, "");
  };

  const text =
    properties?.gemarkung +
    " " +
    properties?.flur +
    " " +
    removeLeadingZeros(properties?.fstck_zaehler) +
    "/" +
    (removeLeadingZeros(properties?.fstck_nenner) || 0);

  return (
    <div className="relative mt-2 bg-white text-lg w-full z-[999] pointer-events-none flex gap-1">
      {!isEmpty(properties) && text}
    </div>
  );
};

export default Toolbar;
