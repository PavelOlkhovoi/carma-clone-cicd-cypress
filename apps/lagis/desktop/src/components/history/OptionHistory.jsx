import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  storeHistorieHalten,
  getHistory,
  getHistorieHalten,
  storeHistorieHaltenRootText,
} from "../../store/slices/lagis";
import { Checkbox } from "antd";
import { useEffect } from "react";
import { historie } from "@carma-collab/wuppertal/lagis-desktop";

const mockExtractor = (input) => {
  return {
    options: ["Historie halten"],
  };
};

const OptionHistory = ({
  dataIn,
  extractor = mockExtractor,
  setHistorieHalten,
  historieHalten,
  rootObjectText,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  const currentHistory = useSelector(getHistory);
  const historieHaltenData = useSelector(getHistorieHalten);
  const dispatch = useDispatch();
  const isStory = false;
  const storyStyle = { width, height, ...style };
  const onChange = (e) => {
    const ifHistorieHalten = e.target.checked;
    setHistorieHalten(e.target.checked);
    if (ifHistorieHalten) {
      dispatch(storeHistorieHaltenRootText(rootObjectText));
      dispatch(storeHistorieHalten(currentHistory));
    } else {
      dispatch(storeHistorieHalten(undefined));
    }
  };

  useEffect(() => {
    if (historieHalten && historieHaltenData === undefined) {
      dispatch(storeHistorieHalten(currentHistory));
      dispatch(storeHistorieHaltenRootText(undefined));
    }
  }, [currentHistory]);
  useEffect(() => {
    // console.log("historieHalten", historieHalten);
  }, [historieHalten]);
  return (
    <div
      className="shadow-md w-full h-full overflow-auto"
      style={
        isStory
          ? storyStyle
          : {
              borderRadius: "6px",
              backgroundColor: "white",
            }
      }
    >
      <InfoBlock title={historie.optionen.title}>
        <div className="mt-4 ml-[13px]">
          <Checkbox onChange={onChange} checked={historieHalten}>
            {historie.optionen.haltenitle}
          </Checkbox>
        </div>
      </InfoBlock>
    </div>
  );
};

export default OptionHistory;
OptionHistory.propTypes = {
  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.object,
  /**
   * The extractor function that is used to transform the dataIn object into the data object
   */
  extractor: PropTypes.func,
  /**
   * The width of the component
   * @default 300
   * @type number
   * @required false
   * @control input
   * @group size
   *
   **/
  width: PropTypes.number,

  /**
   * The height of the component
   *
   * @default 300
   * @type number
   * @required false
   * @control input
   *
   **/

  height: PropTypes.number,
};
