import { useState, useEffect } from "react";
import { Table } from "antd";
import "./table-style.css";

const TableCustom = ({
  columns,
  data,
  pagination = false,
  addClass = "table-wrapper",
  setActiveRow,
  activeRow,
  fixHeight = false,
  setActiveDataId,
}) => {
  const [selectedRow, setSelectedRow] = useState(activeRow);
  const handleRowClick = (record) => {
    setActiveRow(record);
    setSelectedRow(record?.id);
    if (setActiveDataId) {
      setActiveDataId(record?.id);
    }
  };
  const fixStyles = {
    position: "absolute",
    padding: "0 0 8px",
    left: 0,
    top: 0,
    width: "100%",
  };
  let paginationConfig = !pagination
    ? pagination
    : {
        // pageSize: 4,
      };
  return (
    <div
      className={addClass}
      style={
        fixHeight
          ? fixStyles
          : {
              padding: "0 0 8px",
            }
      }
    >
      <Table
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          className:
            record?.id === activeRow?.id ? "ant-table-row-selected" : "",
        })}
        columns={columns}
        dataSource={data}
        pagination={paginationConfig}
        bordered={true}
        // scroll={{ y: "auto" }}
      />
    </div>
  );
};

export default TableCustom;
