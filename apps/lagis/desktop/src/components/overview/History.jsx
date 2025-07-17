import PropTypes from "prop-types";
import { FieldTimeOutlined } from "@ant-design/icons";
import OverviewCard from "../ui/OverviewCard";
import "./style.css";
import { Link } from "react-router-dom";
import { buildUrlParams } from "../../core/tools/helper";
import { DashOutlined } from "@ant-design/icons";
import { defaultLinksColor } from "../../core/tools/helper";
import { overview } from "@carma-collab/wuppertal/lagis-desktop";

const mockExtractor = (input) => {
  return { number: "4", color: "#FFD029" };
};
const DashboardHistory = ({
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
      {data === undefined ? (
        <OverviewCard
          title={overview.historieTitle}
          icon={<FieldTimeOutlined style={{ color: defaultLinksColor }} />}
        >
          <div
            style={{
              color: data?.color || defaultLinksColor,
              fontSize: "5.5rem",
              textAlign: "left",
              width: "100%",
              lineHeight: "1.2",
            }}
          >
            {/* <strong>
              {data.icon === false && data.number === 0 ? (
                ""
              ) : (
                <DashOutlined style={{ color: defaultLinksColor }} />
              )}
            </strong> */}
          </div>
        </OverviewCard>
      ) : (
        <Link to={`/historie?${buildUrlParams(parametersForLink)}`}>
          <OverviewCard
            title={overview.historieTitle}
            icon={<FieldTimeOutlined style={{ color: "#FFD029" }} />}
            ifDefaultColor={false}
          >
            <div
              style={{
                color: "#FFD029",
                fontSize: "5.5rem",
                textAlign: "left",
                width: "100%",
                lineHeight: "1.2",
              }}
            >
              <strong>{(data + 1).toString().padStart(2, "0")}</strong>
            </div>
          </OverviewCard>
        </Link>
      )}
    </div>
  );
};
export default DashboardHistory;

DashboardHistory.propTypes = {
  /**
   * The current main data object that is being used
   */
  dataIn: PropTypes.array,
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
