import { Card, DatePicker } from "antd";
import Map from "../components/commons/Map";
import SignCard from "../components/kataster/SignCard";
import { useState } from "react";

const KatasterPage = () => {
  const [signs, setSigns] = useState([
    {
      position: "Vorne",
    },
  ]);

  return (
    <Card
      bodyStyle={{
        overflowY: "auto",
        overflowX: "clip",
        maxHeight: "94%",
        height: "100%",
      }}
      className="h-full w-full"
      title={<span className="text-2xl">Standort 5903</span>}
    >
      <div className="h-full w-full flex flex-col gap-2">
        <div className="w-full flex gap-2 h-3/4">
          <Map width="70%" height="100%" />
          <Card
            bodyStyle={{
              height: "100%",
            }}
            title="Bild"
            className="w-[30%]"
            size="small"
          >
            <div className="h-full w-full flex items-center justify-center">
              Kein Bild verfügbar
            </div>
          </Card>
        </div>
        <div className="flex gap-2 items-center">
          <span>Schilder zum Zeitpunkt:</span>
          <DatePicker className="w-50" format="DD.MM.YYYY" />
        </div>
        {signs.map((sign, i) => (
          <SignCard
            sign={sign}
            key={`sign_${i}`}
            index={i}
            setSigns={setSigns}
          />
        ))}
      </div>
    </Card>
  );
};

export default KatasterPage;
