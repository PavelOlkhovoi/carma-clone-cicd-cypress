import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Card, Checkbox, Select, Input } from "antd";

const { TextArea } = Input;

const SignItem = ({ position }) => {
  return (
    <div className="h-full w-full grid grid-cols-12 gap-2 gap-y-4">
      <span className="col-span-1">Position:</span>
      <Select
        className="col-span-8"
        value={position}
        options={[
          {
            value: "vorne",
            label: "Vorne",
          },
          {
            value: "hinten",
            label: "Hinten",
          },
        ]}
      />
      <div className="col-span-1 flex items-center">
        <ArrowDownOutlined />
        <span className="w-full text-center">2</span>
        <ArrowUpOutlined />
      </div>
      <div className="col-span-2"></div>
      <span className="col-span-1">Verkehrszeichen:</span>
      <Select className="col-span-1" />
      <Select className="col-span-7" />
      <div className="col-span-1 flex items-center justify-center">
        <Checkbox>Privat</Checkbox>
      </div>
      <div className="col-span-2"></div>
      <span className="col-span-1">Beschriftung:</span>
      <TextArea className="col-span-9" rows={4} />
      <div className="col-span-2"></div>
      <span className="col-span-1">Verfügungsnummer:</span>
      <Select className="col-span-7" />
      <div className="col-span-2 flex gap-2 items-center">
        <span className="w-full">Gültig von:</span>
        <Select className="w-full" />
      </div>
      <div className="col-span-2 flex gap-2 items-center">
        <span>bis:</span>
        <Select className="w-full" />
      </div>
      <span className="col-span-1">Bemerkung:</span>
      <TextArea className="col-span-11" rows={4} />
    </div>
  );
};

const SignCard = ({ sign, index, setSigns }) => {
  return (
    <Card
      size="small"
      title="Schild"
      bodyStyle={{
        overflowY: "auto",
        overflowX: "clip",
        maxHeight: "96%",
      }}
      extra={
        <div className="flex items-center gap-6">
          <MinusOutlined
            className="cursor-pointer"
            onClick={() =>
              setSigns((signs) => signs.filter((sign, i) => i !== index))
            }
          />
          <PlusOutlined
            className="cursor-pointer"
            onClick={() => setSigns((signs) => [...signs, { position: "" }])}
          />
        </div>
      }
    >
      <SignItem position={sign?.position} />
    </Card>
  );
};

export default SignCard;
