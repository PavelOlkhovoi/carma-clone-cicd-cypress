import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomCard from "../ui/Card";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getAenderungsAnfrage,
  getKassenzeichen,
} from "../../store/slices/search";
import {
  getOverviewFeatureTypes,
  setOverviewFeatureTypes,
} from "../../store/slices/ui";
import { Switch } from "antd";

const mockExtractor = (kassenzeichen, aenderungsAnfrage) => {
  return [];
};

const Statistics = ({
  width = 300,
  height = 200,
  style,
  extractor = mockExtractor,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const aenderungsAnfrage = useSelector(getAenderungsAnfrage);
  const data = extractor(kassenzeichen, aenderungsAnfrage);
  const overviewFeatureTypes = useSelector(getOverviewFeatureTypes) || [];
  const dispatch = useDispatch();
  const featureMap = {
    Flächen: "flaeche",
    Fronten: "front",
    Geometrien: "general",
    Versickerungsgenehmigungen: "befreiung",
  };

  const toggle = (featureType) => {
    const ft = overviewFeatureTypes;
    if (ft.includes(featureType)) {
      dispatch(setOverviewFeatureTypes(ft.filter((ft) => ft !== featureType)));
    } else {
      dispatch(setOverviewFeatureTypes([...ft, featureType]));
    }
  };

  return (
    <CustomCard
      style={{ ...style, width, height }}
      title="Statistik"
      extra={<FontAwesomeIcon icon={faMap} className="pr-2" />}
    >
      <div className="flex flex-col gap-1 text-sm font-medium">
        {data.map((row, i) => {
          return (
            <div
              key={`statistics_row_${i}`}
              className={`flex gap-2 items-center py-1 hover:bg-zinc-100 cursor-pointer ${
                row.value ? "" : "hidden"
              }`}
              onClick={() => {
                toggle(featureMap[row.title]);
              }}
            >
              <span>{row.value}</span>
              <span className="w-full">{row.title}</span>
              <Switch
                checked={
                  overviewFeatureTypes.indexOf(featureMap[row.title]) !== -1
                }
                size="small"
              />
            </div>
          );
        })}
      </div>
    </CustomCard>
  );
};

export default Statistics;
