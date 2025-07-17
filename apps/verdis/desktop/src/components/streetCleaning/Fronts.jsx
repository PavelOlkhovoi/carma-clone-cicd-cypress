import { Table } from "antd";
import CustomCard from "../ui/Card";
import {
  getFrontenId,
  getKassenzeichen,
  storeFrontenId,
} from "../../store/slices/search";
import { useDispatch, useSelector } from "react-redux";

const mockExtractor = (kassenzeichen) => {
  return [];
};

const columns = [
  {
    title: "Nummer",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Länge in m",
    dataIndex: "length",
    key: "length",
  },
  {
    title: "Klasse",
    dataIndex: "class",
    key: "class",
  },
];

const Fronts = ({
  width = 300,
  height = 200,
  style,
  extractor = mockExtractor,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);
  const frontenId = useSelector(getFrontenId);
  const dispatch = useDispatch();

  return (
    <CustomCard style={{ ...style, width, height }} title="Fronten">
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey={(record) => record.number + record.length + record.class}
        size="small"
        onRow={(record) => {
          return {
            onClick: () => dispatch(storeFrontenId(record.id)),
          };
        }}
        rowClassName={(record) =>
          `${record.id === frontenId && "bg-primary/20"} cursor-pointer`
        }
      />
    </CustomCard>
  );
};

export default Fronts;
