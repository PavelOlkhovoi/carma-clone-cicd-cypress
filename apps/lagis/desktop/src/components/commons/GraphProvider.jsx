import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import Graph from "./Graph";
import { Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function GraphProvider(props) {
  return (
    <div>
      {!props.loading ? (
        <Card
          size="small"
          hoverable={false}
          title={
            <span>
              <FontAwesomeIcon icon={faBars} /> Graph
            </span>
          }
          className="shadow-md"
          style={{
            width: props.width,
            height: props.height,
          }}
        ></Card>
      ) : (
        <ReactFlowProvider>
          <Graph {...props} />
        </ReactFlowProvider>
      )}
    </div>
  );
}

export default GraphProvider;
