import "react-chat-elements/dist/main.css";
import { Avatar, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const mockExtractor = (input) => {
  return [
    {
      title: "Darlene Steward",
      message: "Guck dir bitte die letzten Bilder an.",
      date: new Date(),
      unreadMessages: 2,
    },
    {
      title: "Fullsnack Designers",
      message:
        "Hallo Leute, wie wir besprochen haben wird nächsten Donnerstag unser Event stattfinden",
      date: new Date(),
      unreadMessages: 3,
    },
    {
      title: "Lee Williamson",
      message: "Ja das sollte funktionieren.",
      date: new Date(),
      unreadMessages: 1,
    },
  ];
};

const RecentChats = ({
  dataIn,
  extractor = mockExtractor,
  width = 300,
  height = 200,
  style,
}) => {
  const data = extractor(dataIn);
  return (
    <Card
      style={{ ...style, width, height }}
      bodyStyle={{
        overflowY: "auto",
        maxHeight: "calc(100% - 45px)",
      }}
      title={
        <div className="flex w-full justify-between items-center">
          <span className="text-2xl font-semibold">Letzte Nachrichten</span>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      }
      size="small"
      hoverable={false}
    >
      <div className="flex flex-col gap-2">
        {data.map((chat) => (
          <div className="flex items-center gap-2 rounded-md bg-primary/5 py-2 px-4">
            <Avatar icon={<FontAwesomeIcon icon={faUser} />} />
            <div className="flex flex-col w-full overflow-clip gap-1">
              <div className="flex justify-between items-center">
                <span className="w-full font-bold">{chat.title}</span>
                <span className="text-zinc-500">
                  {chat.date.getHours()}:{chat.date.getMinutes()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="w-full truncate">{chat.message}</span>
                <div className="rounded-full h-6 w-6 flex items-center justify-center bg-primary/80 text-white">
                  {chat.unreadMessages}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-full absolute bottom-2 right-3 cursor-pointer bg-primary h-14 w-14 flex items-center justify-center">
        <FontAwesomeIcon
          icon={faComment}
          className="h-6 w-6"
          style={{ color: "#ffffff" }}
        />
      </div>
    </Card>
  );
};

export default RecentChats;
