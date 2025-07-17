import PropTypes from "prop-types";
import { PieChartOutlined } from "@ant-design/icons";
import OverviewCard from "../ui/OverviewCard";
import "./style.css";
import { Link } from "react-router-dom";
import { buildUrlParams } from "../../core/tools/helper";
import { defaultLinksColor } from "../../core/tools/helper";
import { overview } from "@carma-collab/wuppertal/lagis-desktop";

const mockExtractor = (input) => {
  return { numberOfUsages: "1", color: "#F31630" };
};
const DashboardUsage = ({
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
          title={overview.nutzungTitle}
          subtitle={overview.nutzungSubtitle}
          icon={<PieChartOutlined style={{ color: defaultLinksColor }} />}
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
            <strong>{data.numberOfUsages.toString().padStart(2, "0")}</strong>
          </div>
        </OverviewCard>
      ) : (
        <Link to={`/nutzung?${buildUrlParams(parametersForLink)}`}>
          <OverviewCard
            title={overview.nutzungTitle}
            subtitle={overview.nutzungSubtitle}
            ifDefaultColor={false}
            icon={<PieChartOutlined style={{ color: data.color }} />}
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
              <strong>{data.numberOfUsages.toString().padStart(2, "0")}</strong>
            </div>
          </OverviewCard>
        </Link>
      )}
    </div>
  );
};
export default DashboardUsage;

DashboardUsage.propTypes = {
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
