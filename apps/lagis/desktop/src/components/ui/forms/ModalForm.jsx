import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Input, Select, DatePicker } from "antd";
import Labelform from "./Labelform";
import CustomTags from "../tags/CustomTags";
import UploadFiles from "./UploadFiles";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
const { TextArea } = Input;
const ModalForm = ({
  customFields,
  updateHandle,
  size = 24,
  buttonPosition = { justifyContent: "end" },
  tagsBar = [],
  showFileUpload = false,
  formName,
  setModalOpen,
}) => {
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    updateHandle({ key: formName, ...values });
    setModalOpen(false);
  };
  const dateFormat = "DD.MM.YYYY";
  useEffect(() => {
    const fieldValues = {};
    customFields?.forEach((field) => {
      fieldValues[field.name] = field.value !== "" ? field.value : undefined;
    });
    form.setFieldsValue(fieldValues);
  }, [customFields, form]);

  return (
    <Form
      form={form}
      name={formName}
      layout="vertical"
      autoComplete="off"
      onFinish={handleFinish}
    >
      <Row gutter={12}>
        {customFields?.map((item) => (
          <Col span={size} key={item.key}>
            {item.type === "select" ? (
              <Form.Item name={item.name} label={item.title}>
                <Select>
                  {item.options.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : item.type === "date" ? (
              <Form.Item name={item.name} label={item.title}>
                <DatePicker format={dateFormat} style={{ width: "100%" }} />
              </Form.Item>
            ) : item.type === "note" ? (
              <Form.Item name={item.name} label={item.title}>
                <TextArea rows={4} style={{ width: "100%" }} />
              </Form.Item>
            ) : (
              <Form.Item name={item.name} label={item.title}>
                <Input />
              </Form.Item>
            )}
          </Col>
        ))}
      </Row>
      {tagsBar.length > 0 && (
        <Row>
          <Col span={24}>
            <div className="flex gap-2 mb-5 mt-2">
              <span style={{ color: "red" }}>*</span>
              <Labelform
                name="Eigenschaften"
                customStyle={{ fontSize: "14" }}
              />
            </div>
          </Col>
          <Col span={24}>
            <CustomTags />
          </Col>
        </Row>
      )}
      {showFileUpload && (
        <Row style={{ marginBottom: "30px" }}>
          <Col span={24}>
            <div className="flex gap-2 mb-5 mt-2">
              <span style={{ color: "red" }}>*</span>
              <Labelform name="Bild" customStyle={{ fontSize: "14" }} />
            </div>
          </Col>
          <Col span={24}>
            <UploadFiles />
          </Col>
        </Row>
      )}
      <Form.Item style={{ margin: "10px" }}>
        <div className="flex items-center" style={buttonPosition}>
          <Button type="primary" ghost htmlType="reset" className="mr-4">
            Abbrechen
          </Button>
          <Button type="primary" htmlType="submit">
            {showFileUpload ? " Hochladen" : "Ok"}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ModalForm;
