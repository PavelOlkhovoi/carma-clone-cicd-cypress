import PropTypes from "prop-types";
import React from "react";
import CustomCard from "../ui/Card";
const mockExtractor = (input) => {
  return {
    status: "neue Nachricht",
    betroffeneFlaechenc: [
      { id: 9873, title: "A" },
      { id: 123, title: "C" },
      { id: 355, title: "3" },
    ],
  };
};
const ChangeRequests = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);

  const title = "Änderungsanfragen";

  return (
    <CustomCard style={{ ...style, width, height }} title={title} fullHeight>
      <p>
        Status: <b>{data.status}</b>
      </p>
      <p>
        Betroffene Flächen:{" "}
        {data.betroffeneFlaechenc.map((flaeche, index) => {
          return (
            <span key={index}>
              {flaeche.title}
              {index < data.betroffeneFlaechenc.length - 1 && ", "}
            </span>
          );
        })}
      </p>
    </CustomCard>
  );
};
export default ChangeRequests;

ChangeRequests.propTypes = {
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
   * @default 200
   * @type number
   * @required false
   * @control input
   *
   **/

  height: PropTypes.number,

  /**
   * additional style of the component
   *
   * @type object
   * @required false
   * @control input
   * @group style
   *
   *
   * */
  style: PropTypes.object,
};
