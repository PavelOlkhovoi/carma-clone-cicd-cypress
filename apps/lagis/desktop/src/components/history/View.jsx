import PropTypes from "prop-types";
import InfoBlock from "../ui/Blocks/InfoBlock";
import { InputNumber, Select } from "antd";
import { historie } from "@carma-collab/wuppertal/lagis-desktop";
const mockExtractor = (input) => {
  return {
    successor: [
      { value: "Direkte", label: "Direkte Vorgänger/Nachfolger" },
      { value: "Vollständig", label: "Vollständig" },
      { value: "Begrenzte", label: "Begrenzte Tiefe" },
    ],
    parcels: [
      { value: "Flurstücke", label: "Alle Flurstücke" },
      { value: "Nachfolger", label: "Nur Nachfolger" },
      { value: "Vorgänger", label: "Nur Vorgänger" },
    ],
  };
};
const View = ({
  dataIn,
  extractor = mockExtractor,
  setFirstDarstellung,
  setSecondDarstellung,
  setNumberBegrenzteTiefe,
  firstDarstellung,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  const handleChangeFirst = (value) => {
    setFirstDarstellung(value);
  };
  const handleChangeSecond = (value) => {
    setSecondDarstellung(value);
  };

  const onChangeNunber = (value) => {
    setNumberBegrenzteTiefe(value);
  };
  const isStory = false;
  const storyStyle = { width, height, ...style };
  return (
    <div
      className="shadow-md w-full h-full overflow-auto"
      style={
        isStory
          ? storyStyle
          : {
              // height: `${height}px`,
              borderRadius: "6px",
              backgroundColor: "white",
              // height: "100%",
            }
      }
    >
      <InfoBlock title={historie.darstellung.title}>
        <div className="flex flex-col p-4">
          <div className="mt-1 flex gap-2">
            <Select
              defaultValue="Vollständig"
              style={{ width: "100%" }}
              onChange={handleChangeFirst}
              options={data.successor}
              className="mb-3"
            />
            <div className="begrenzte-wrapper">
              <InputNumber
                min={1}
                max={100000}
                defaultValue={1}
                disabled={firstDarstellung !== "Begrenzte" ? true : false}
                style={{ width: "50px" }}
                onChange={onChangeNunber}
              />
            </div>
          </div>
          <Select
            defaultValue="Flurstücke"
            style={{ width: "100%" }}
            onChange={handleChangeSecond}
            options={data.parcels}
          />
        </div>
      </InfoBlock>
    </div>
  );
};
export default View;
View.propTypes = {
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
