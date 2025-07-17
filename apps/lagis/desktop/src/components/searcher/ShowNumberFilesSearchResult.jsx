import React from "react";
import { Divider } from "antd";
import { useSearchParams } from "react-router-dom";
import {
  BankOutlined,
  BlockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

const ShowNumberFilesSearchResult = ({
  dataContract,
  dataMipa,
  extractor,
  cleaFunc,
  collapsed,
}) => {
  const data = extractor(dataContract, dataMipa);
  const [urlParams, setUrlParams] = useSearchParams();
  const dividerMargin = "4px 0";
  const lineStyle = {
    height: "1px",
    background: "#2A83FF",
    borderRadius: "20px",
    margin: dividerMargin,
  };
  const bigDividerStyle = {
    height: "8px",
    background: "#F1F1F1",
    margin: dividerMargin,
    position: "absolute",
    width: "300px",
    top: "-12px",
    left: "-10px",
  };
  const displayBlock =
    !dataContract || !dataMipa || collapsed ? "none" : "block";
  return (
    <>
      <div
        style={{
          position: "relative",
          margin: "0",
          padding: "0",
          display: displayBlock,
        }}
      >
        <div style={bigDividerStyle}></div>
        <div className="flex items-center mt-[14px] pl-2 justify-between">
          <h4 className="text-left text-sm font-semibold text-[#6c6a6a]">
            Ergebnisse
          </h4>
          <Tooltip title="Ergebnisse löschen">
            <CloseCircleOutlined
              className="text-sm mt-[-8px] hover:text-[#f31630] cursor-pointer"
              onClick={cleaFunc}
            />
          </Tooltip>
        </div>
        <div style={lineStyle}></div>
      </div>
      <div
        style={{
          minHeight: "0px",
          background: "#ffffff",
          marginBottom: "6px",
          display: displayBlock,
        }}
        className="overflow-y-auto overflow-x-hidden"
      >
        {data.length !== 0 ? (
          data.map((c) => {
            return (
              <div
                key={c.id}
                onClick={() => setUrlParams(c.searchParamsObj)}
                style={{
                  color: c.color,
                  background: "#fffff",
                }}
              >
                <div className="h-[34px] text-[14px] flex items-center pl-3 cursor-pointer hover:bg-gray-100 text-center rounded">
                  {c.iconType === "bank" ? <BankOutlined /> : <BlockOutlined />}
                  <span className="ml-2 py-1">{c.content}</span>
                </div>
                <Divider
                  style={{ margin: dividerMargin }}
                  className="hover:bg-gray-100 text-center rounded"
                />
              </div>
            );
          })
        ) : (
          <div className="h-[40px] text-xs">Keine Ergebnisse gefunden</div>
        )}
      </div>
    </>
  );
};

export default ShowNumberFilesSearchResult;
