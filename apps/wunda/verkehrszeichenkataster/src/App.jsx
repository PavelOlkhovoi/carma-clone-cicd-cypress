import { Card } from "antd";
import Map from "./components/commons/Map";

function App() {
  return (
    <div className="h-full max-h-[calc(100vh-73px)] w-full bg-zinc-200 p-2 flex flex-col items-center gap-2">
      <div className="flex gap-2 items-center h-1/3 w-full">
        <Card title="Anzahl" className="h-full w-full">
          12
        </Card>
        <Card title="Infos" className="h-full w-full">
          Infos
        </Card>
        <Card title="Andere Infos" className="h-full w-full">
          Andere Infos
        </Card>
      </div>
      <Map key={"overview.map"} width={"100%"} height={"66%"} />
    </div>
  );
}

export default App;
