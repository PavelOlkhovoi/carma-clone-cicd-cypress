import { Button } from "antd";
import InfoBar from "./InfoBar";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const DetailSwitcher = ({ title, buttonName, baseRoute, setShowDetails }) => {
  const navigate = useNavigate();
  const match = useMatch(baseRoute);
  const [urlParams] = useSearchParams();
  const dispatch = useDispatch();

  return (
    <InfoBar title={title}>
      <Button
        type={match ? "primary" : "default"}
        onClick={() => {
          if (!match) {
            dispatch(setShowDetails(false));
            navigate(".." + `?${urlParams}`, { relative: "path", state: {} });
          }
        }}
      >
        Übersicht
      </Button>
      <Button
        type={match ? "default" : "primary"}
        onClick={() => {
          if (match) {
            dispatch(setShowDetails(true));
            navigate("./details" + `?${urlParams}`, { relative: "path" });
          }
        }}
      >
        {buttonName}
      </Button>
    </InfoBar>
  );
};

export default DetailSwitcher;
