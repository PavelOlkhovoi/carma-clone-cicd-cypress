import PropTypes from "prop-types";
import { FilePdfOutlined } from "@ant-design/icons";
import "./style.css";
import OverviewCard from "../ui/OverviewCard";
import { Link } from "react-router-dom";
import { buildUrlParams } from "../../core/tools/helper";
import { defaultLinksColor } from "../../core/tools/helper";
import { overview } from "@carma-collab/wuppertal/lagis-desktop";

const mockExtractor = (input) => {
  return { numberOfDocuments: "3", color: "#180E53" };
};
const DashboardDMS = ({
  dataIn,
  extractor = mockExtractor,
  parametersForLink,
  width = 231,
  height = 188,
  style,
}) => {
  const data = extractor(dataIn);
  return (
    <div className="dashboard-tile">
      {data.color === defaultLinksColor ? (
        <OverviewCard
          style={{ height }}
          title={overview.dmsTitle}
          icon={<FilePdfOutlined style={{ color: defaultLinksColor }} />}
        >
          <div
            style={{
              color: defaultLinksColor,
              fontSize: "5.5rem",
              textAlign: "left",
              width: "100%",
              lineHeight: "1.2",
            }}
          >
            <strong>
              {data.numberOfDocuments.toString().padStart(2, "0")}
            </strong>
          </div>
        </OverviewCard>
      ) : (
        <Link to={`/dms?${buildUrlParams(parametersForLink)}`}>
          <OverviewCard
            style={{ height }}
            title={overview.dmsTitle}
            icon={<FilePdfOutlined style={{ color: data.color }} />}
            ifDefaultColor={false}
          >
            <div
              style={{
                color: data.color,
                fontSize: "5.5rem",
                textAlign: "left",
                width: "100%",
                lineHeight: "1.2",
              }}
            >
              <strong>
                {data.numberOfDocuments.toString().padStart(2, "0")}
              </strong>
            </div>
          </OverviewCard>
        </Link>
      )}
    </div>
  );
};
export default DashboardDMS;

DashboardDMS.propTypes = {
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
