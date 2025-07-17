import { Space, Badge } from "antd";
import {
  FilterFilled,
  PrinterOutlined,
  FileTextOutlined,
  CopyOutlined,
  SnippetsOutlined,
  BellFilled,
} from "@ant-design/icons";
const UserBarActions = () => {
  const iconStyles = { color: "#1890FF", fontSize: "14px" };
  return (
    <Space>
      <FilterFilled style={iconStyles} />
      <PrinterOutlined style={iconStyles} />
      <FileTextOutlined style={iconStyles} />
      <SnippetsOutlined style={iconStyles} />
      <CopyOutlined style={iconStyles} />
      <Badge count={5} size="small">
        <BellFilled style={iconStyles} />
      </Badge>
    </Space>
  );
};

export default UserBarActions;
