import { Checkbox, Table } from "antd";
import CustomCard from "../ui/Card";

const mockExtractor = (input) => {
  return [];
};

const columns = [
  {
    title: "Aktenzeichen",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Antrag vom",
    dataIndex: "seepageFrom",
    key: "seepageFrom",
  },
  {
    title: "gültig bis",
    dataIndex: "seepageUntil",
    key: "seepageUntil",
  },
  {
    title: "Nutzung",
    dataIndex: "useCase",
    key: "useCase",
  },
  {
    title: "Typ",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Q[l/s]",
    dataIndex: "seepage",
    key: "seepage",
  },
  {
    title: "G-Verth",
    dataIndex: "gVerth",
    key: "gVerth",
    render: (gVerth) => (
      <Checkbox checked={gVerth} className="flex justify-center" />
    ),
  },
];

const Exemption = ({
  dataIn,
  extractor = mockExtractor,
  width = 900,
  height = 400,
  style,
}) => {
  const data = extractor(dataIn);

  return (
    <CustomCard style={{ ...style, width, height }} title="Befreiung/Erlaubnis">
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
      />
    </CustomCard>
  );
};

export default Exemption;
