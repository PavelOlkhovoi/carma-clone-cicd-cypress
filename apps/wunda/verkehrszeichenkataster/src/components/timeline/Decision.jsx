import { Form, Select } from "antd";
import AttachmentWrapper, { AttachmentRow } from "./AttachmentWrapper";

const Decision = ({ attachment, id }) => {
  const [form] = Form.useForm();

  return (
    <AttachmentWrapper index={id}>
      <AttachmentRow attachment={attachment} index={id}>
        <Select defaultValue={"Abgeschlossen"} className="w-full" id={id} />
      </AttachmentRow>
    </AttachmentWrapper>
  );
};

export default Decision;
