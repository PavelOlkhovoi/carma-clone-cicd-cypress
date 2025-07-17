import { FolderOpenOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import OverviewCard from "../ui/OverviewCard";
import "./style.css";
import { Link } from "react-router-dom";
import { buildUrlParams } from "../../core/tools/helper";
import { defaultLinksColor } from "../../core/tools/helper";
import { HistoryOutlined } from "@ant-design/icons";
import { overview } from "@carma-collab/wuppertal/lagis-desktop";

const mockExtractor = (input) => {
  return [
    { title: "104.2", color: "#0097FA", size: 250 },
    { title: "403.4", color: "#6254EA", size: 50 },
  ];
};
const DashboardOffices = ({
  dataIn,
  extractor = mockExtractor,
  parametersForLink,
  width = 231,
  height = 188,
  style,
}) => {
  let square = "18px";
  const data = extractor(dataIn);
  return (
    <div className="dashboard-tile">
      {data.currentOffices.length > 0 ? (
        <Link to={`/verwaltungsbereiche?${buildUrlParams(parametersForLink)}`}>
          <OverviewCard
            title={overview.verwaltungTitle}
            subtitle={overview.verwaltungTitleSubtitle}
            icon={
              <div className="flex items-center">
                {data.history > 0 ? (
                  <HistoryOutlined
                    style={{
                      // marginRight: "10px",
                      // fontSize: "20px",
                      marginTop: "1px",
                      color: "#0097FA",
                    }}
                    className="min-[985px]:text-[15px] min-[1257px]:text-[17px] min-[1357px]:text-[20px] mr-2"
                  />
                ) : (
                  <HistoryOutlined
                    style={{
                      color: defaultLinksColor,
                      // marginRight: "10px",
                      // fontSize: "20px",
                      marginTop: "1px",
                    }}
                    className="min-[985px]:text-[15px] min-[1257px]:text-[17px] min-[1357px]:text-[20px] mr-2"
                  />
                )}
                <FolderOpenOutlined style={{ color: "#0097FA" }} />
              </div>
            }
            ifDefaultColor={false}
          >
            <div className="flex flex-col mt-auto">
              {data.currentOffices?.map((item, index) => (
                <div
                  className="flex justify-between items-center"
                  key={`currentOffices` + index}
                >
                  <div className="flex justify-between items-center">
                    {item?.title && (
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          marginRight: "6px",
                          backgroundColor: item?.color || "#0097FA",
                        }}
                      ></span>
                    )}
                    <span
                      style={{
                        color: item?.color || defaultLinksColor,
                        fontSize: item?.title ? square : "88px",
                        marginBottom: item?.title ? "0px" : "-5px",
                      }}
                      className="font-bold"
                    >
                      {item?.title || "00"}
                    </span>
                  </div>
                  <span
                    style={{
                      color: "#6C6A6A",
                      fontSize: square,
                    }}
                  >
                    {item?.size ? `${item?.size} m²` : ""}
                  </span>
                </div>
              ))}
            </div>
          </OverviewCard>
        </Link>
      ) : (
        <OverviewCard
          title={overview.verwaltungTitle}
          subtitle={overview.verwaltungTitleSubtitle}
          icon={<FolderOpenOutlined style={{ color: defaultLinksColor }} />}
        >
          <div className="flex flex-col mt-auto">
            {data.currentOffices?.map((item) => (
              <div className="flex justify-between items-center mt-1 mb-1">
                <div className="flex justify-between items-center">
                  {item?.title && (
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        marginRight: "6px",
                        backgroundColor: defaultLinksColor,
                      }}
                    ></span>
                  )}
                  <span
                    style={{
                      color: defaultLinksColor,
                      fontSize: item?.title ? square : "88px",
                      marginBottom: item?.title ? "0px" : "-10px",
                    }}
                    className="font-bold"
                  >
                    {item?.title || "00"}
                  </span>
                </div>
                <span
                  style={{
                    color: "#6C6A6A",
                    fontSize: square,
                  }}
                >
                  {item?.size ? `${item?.size} m²` : ""}
                </span>
              </div>
            ))}
          </div>
        </OverviewCard>
      )}
    </div>
  );
};
export default DashboardOffices;

DashboardOffices.propTypes = {
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
