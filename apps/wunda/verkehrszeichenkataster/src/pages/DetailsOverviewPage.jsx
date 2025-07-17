import { Card } from "antd";
import Map from "../components/commons/Map";
import { useSelector } from "react-redux";
import { getCurrentApplication } from "../store/slices/application";

const DetailsOverviewPage = () => {
  const selectedApplication = useSelector(getCurrentApplication);

  return (
    <>
      <div className="w-full flex gap-2 items-center h-1/3">
        <Card title="Anzahl Kataster" className="w-full h-full">
          <h3 className="font-semibold text-xl">
            {selectedApplication.anzahl}
          </h3>
        </Card>
        <Card title="Antrag gestartet" className="w-full h-full">
          <h3 className="font-semibold text-xl">{selectedApplication.date}</h3>
        </Card>
        <Card title="Letzte Änderung" className="w-full h-full">
          <h3 className="font-semibold text-xl">20.11.2023</h3>
        </Card>
      </div>
      <Map height={"100%"} width={"100%"} />
    </>
  );
};

export default DetailsOverviewPage;
