import { Table } from "antd";
import CustomCard from "../ui/Card";
import { useSelector } from "react-redux";
import { getKassenzeichen } from "../../store/slices/search";
import { compare } from "../../tools/helper";

const mockExtractor = (input) => {
  const data = input?.flaechenArray?.map((row) => ({
    name: row?.flaecheObject?.flaechenbezeichnung,
    size: row?.flaecheObject?.flaecheninfoObject?.groesse_aus_grafik,
    type: row?.flaecheObject?.flaecheninfoObject?.flaechenbeschreibung
      ?.beschreibung,
  }));
  return data;
};

const columns = [
  {
    title: "Bez.",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => compare(a.name, b.name),
  },
  {
    title: "Typ",
    dataIndex: "type",
    key: "type",
    sorter: (a, b) => compare(a.type, b.type),
  },
  {
    title: "Größe",
    dataIndex: "size",
    key: "size",
    sorter: (a, b) => compare(a.size, b.size),
    render: (area) => <div>{area} m²</div>,
  },
];

const Areas = ({
  width = 300,
  height = 200,
  style,
  extractor = mockExtractor,
}) => {
  const kassenzeichen = useSelector(getKassenzeichen);
  const data = extractor(kassenzeichen);

  return (
    <CustomCard style={{ ...style, width, height }} title="Flächen">
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey={(record) => record.name + record.type + record.size}
        size="small"
        showSorterTooltip={false}
      />
    </CustomCard>
  );
};

export default Areas;
