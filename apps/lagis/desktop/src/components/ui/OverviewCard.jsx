import React from "react";
import { Card } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import "../overview/style.css";
import "./card.css";
import { defaultLinksColor } from "../../core/tools/helper";
const OverviewCard = ({
  style,
  title,
  subtitle,
  icon = <FieldTimeOutlined />,
  ifDefaultColor = true,
  fullHeiht,
  children,
  ...props
}) => {
  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100px",
        minWidth: "200px",
      }}
      headStyle={{ padding: "10px 10px" }}
      bodyStyle={{ padding: "1px 10px", marginTop: "auto" }}
      className="custom-card shadow-md flex flex-col"
      title={
        <div className="flex gap-1 min-[1200px]:gap-2 justify-between flex-wrap">
          <div className="flex flex-col">
            <span
              className="text-sm min-[1257px]:text-base min-[1357px]:text-lg leading-5"
              style={{ color: ifDefaultColor && defaultLinksColor }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                className="text-[12px] min-[1257px]:text-sm"
                style={{
                  color: !ifDefaultColor ? "#6C6A6A" : defaultLinksColor,
                }}
              >
                {subtitle}
              </span>
            )}
          </div>
          <div className="min-[985px]:text-base min-[1257px]:text-lg min-[1357px]:text-2xl">
            {icon}
          </div>
        </div>
      }
      {...props}
    >
      {children}
    </Card>
  );
};

export default OverviewCard;
