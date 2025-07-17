import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";

const { TextArea } = Input;

const mockExtractor = (anordnung) => {
  return anordnung;
};

const AnordnungsForm = ({ dataIn, extractor = mockExtractor }) => {
  const data = extractor(dataIn);

  return (
    <div className="py-10 flex flex-col gap-6 w-1/2">
      <h1 className="text-lg font-semibold">Anordnungsform</h1>
      <Form layout="vertical">
        <Form.Item label="Ort">
          <Input placeholder="Ort" value={data?.street} />
        </Form.Item>
        <Form.Item label="Sachverhalt">
          <TextArea
            rows={6}
            placeholder="Sachverhalt"
            value={data.sachverhalt}
          />
        </Form.Item>
        <Form.Item label="Erforderliche Maßnahmen">
          <TextArea
            rows={3}
            placeholder="Erforderliche Maßnahmen"
            value={data.maßnahmen}
          />
        </Form.Item>
        <Upload>
          <Button icon={<UploadOutlined />}>Bilder hochladen</Button>
        </Upload>
      </Form>
    </div>
  );
};

export default AnordnungsForm;
