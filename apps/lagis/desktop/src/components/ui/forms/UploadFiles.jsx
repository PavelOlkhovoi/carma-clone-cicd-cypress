import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: false,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const UploadFiles = () => (
  <Dragger {...props}>
    <p className="text-3xl my-2">
      <InboxOutlined style={{ color: "light-blue" }} />
    </p>
    <p className="ant-upload-text">
      Klicken oder ziehen Sie die Datei zum Hochladen
    </p>
    <p className="ant-upload-hint">
      Unterstützung für einen Einzel- oder Massenupload. Strenges Verbot des
      Hochladens von Unternehmensdaten oder anderen verbotenen Dateien.
    </p>
  </Dragger>
);
export default UploadFiles;
