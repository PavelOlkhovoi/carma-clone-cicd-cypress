import { CopyOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Button } from "antd";
const DocsIcons = ({ classnames }) => {
  const iconSize = "17px";
  return (
    <div className={classnames}>
      <Button
        size="small"
        className="flex justify-center items-center"
        icon={
          <SnippetsOutlined style={{ fontSize: "12px", color: "#1890FF" }} />
        }
      />
      {/* <SnippetsOutlined
        className="mx-1"
        style={{ color: "#1890FF", fontSize: iconSize }}
      /> */}
      <Button
        size="small"
        className="flex justify-center items-center"
        icon={<CopyOutlined style={{ fontSize: "12px", color: "#1890FF" }} />}
      />
      {/* <CopyOutlined style={{ color: "#1890FF", fontSize: iconSize }} /> */}
    </div>
  );
};

export default DocsIcons;
