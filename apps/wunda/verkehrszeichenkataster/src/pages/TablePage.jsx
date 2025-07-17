import { Button, Card, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllApplications,
  storeAllApplications,
  storeSelectedApplications,
} from "../store/slices/application";
import { anordnungen } from "../constants/mockData";

const columns = [
  {
    title: "Name",
    dataIndex: "timelineTitle",
  },
  {
    title: "Nr",
    dataIndex: "id",
  },
  {
    title: "Typ",
    dataIndex: "typ",
  },
  {
    title: "Status",
    dataIndex: "timelineStatus",
  },
];

const TablePage = () => {
  const dispatch = useDispatch();
  const allApplications = useSelector(getAllApplications);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(storeSelectedApplications(selectedRows));
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  return (
    <div className="h-full max-h-[calc(100vh-73px)] w-full bg-zinc-200 p-2 flex flex-col items-center gap-2">
      <Card
        className="h-full w-full overflow-clip"
        title="Anträge"
        extra={
          <Button onClick={() => dispatch(storeAllApplications(anordnungen))}>
            Anträge laden
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={allApplications}
          rowSelection={rowSelection}
          pagination={false}
          className="w-full"
        />
      </Card>
    </div>
  );
};

export default TablePage;
