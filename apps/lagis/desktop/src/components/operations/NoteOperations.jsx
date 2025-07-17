import { useEffect, useState } from "react";
import CustomNotes from "../ui/notes/CustomNotes";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
const NoteOperations = ({ dataContract, activeRow, setDataContract }) => {
  // const contract = dataContract.find((c) => c.key === activeRow?.key);
  const [textNote, setTextNote] = useState("");
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    // activeRow ? setTextNote(contract.note) : setTextNote("");
  }, [activeRow]);
  return (
    <div className="shadow-md w-full mt-4" style={{ height: "100%" }}>
      <CustomNotes
        height={180}
        styles="p-3"
        // textValue={textNote}
        // setTextNote={setTextNote}
        // setShowButton={setShowButton}
      />
    </div>
  );
};

export default NoteOperations;
