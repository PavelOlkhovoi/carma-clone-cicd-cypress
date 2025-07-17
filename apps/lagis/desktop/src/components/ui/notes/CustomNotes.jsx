import { Input } from "antd";
const { TextArea } = Input;
const CustomNotes = ({ styles, currentText }) => {
  return (
    <div
      className={styles}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextArea
        disabled={true}
        className="shadow-md"
        style={{
          resize: "none",
          outline: "none",
          flexGrow: 1,
        }}
        value={currentText}
      />
    </div>
  );
};

export default CustomNotes;
